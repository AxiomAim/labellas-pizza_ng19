import { createInjectable } from 'ngxtension/create-injectable';
// import { storage } from 'encrypt-storage';
import { signal, computed, inject, effect } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  getAuth, 
  sendPasswordResetEmail,
  Auth,
  signOut,
  getRedirectResult
} from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { signInWithPopup, signInWithRedirect } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UsersDataService } from '@services/data-service/users-data.service';
import { OrganizationsDataService } from '@services/data-service/organizations-data.service';
import { User, UserModel } from '@services/data-service/user.model';
import { Organization } from '@services/data-service/organization.model';
// import { OrganizationsV2Service } from 'app/modules/davesa/administration/organizations/organizationsV2.service';
import {LocalStorageService} from 'ngx-webstorage';

// export const storage = new storage(environment.LOCAL_STORAGE_KEY, {
//   storageType: 'sessionStorage',
// });

const LOGIN_USER = "loginUser";
const AUTH_LOGIN_USER = "authUser";
const ORGANIZATION = "organization";

export const FirebaseAuthV2Service = createInjectable(() => {
  const _router = inject(Router);
  const storage = inject(LocalStorageService);
  // const _authService = inject(AuthService);

  const app = initializeApp(environment.firebase);
  const auth: Auth = getAuth(app);
  const _usersDataService = inject(UsersDataService);
  const _organizationsDataService = inject(OrganizationsDataService);

  // const _organizationsV2Service = inject(OrganizationsV2Service);
  const loginUser = signal<User | null>(null);
  const organization = signal<Organization | null>(null);
  // const user = signal<User | null>(null);
  const loginUserId = signal<string | null>(null);
  const provider = signal<any | null>(null);
  const authUser = signal<any | null>(null);
  const token = signal<any | null>(null);
  const loading = signal(false);
  const error = signal<string | null>(null);
  const googleProvider = new GoogleAuthProvider();
  const microsoftProvider = new OAuthProvider('microsoft.com');
  const facebookProvider = new FacebookAuthProvider();
  const appleProvider = new OAuthProvider('apple.com');
  const twitterProvider = new TwitterAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://www.example.com/finishSignUp?cartId=1234',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
  };

  const setLoginUser = (data: any) => {
    loading.set(true);
    error.set(null);  
    loginUser.set(data)
    setToStorage()
    loading.set(false);
  }

  const loadFromStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      const jsonLoginUser = storage.retrieve(LOGIN_USER);
      loginUser.set(jsonLoginUser)
      const jsonAuthUser = storage.retrieve(AUTH_LOGIN_USER);
      authUser.set(jsonAuthUser)
      const jsonOrganization = storage.retrieve(ORGANIZATION);
      organization.set(jsonOrganization)
    } catch(err: any) {
      error.set(err)
    }
    loading.set(false);

  }

  const setToStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      storage.store(LOGIN_USER, JSON.stringify(loginUser()));
      storage.store(AUTH_LOGIN_USER, JSON.stringify(authUser()));
      storage.store(ORGANIZATION, JSON.stringify(organization()));
    } catch(err: any) {
      error.set(err)
      console.error('Error setting user to storage:', err);
    }
    loading.set(false);

  }

  const removeFromStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      storage.clear(LOGIN_USER);
      storage.clear(AUTH_LOGIN_USER);
      storage.clear(ORGANIZATION);
    } catch(err: any) {
      error.set(err)
      console.error('Error removing Login User from storage:', err);
    }
    loading.set(false);
  }


  const check = (): Observable<boolean> => {
    return new Observable((observer) => { // eslint-disable-line @typescript-eslint/no-unused-vars
      auth.onAuthStateChanged((checkAuthUser) => {
        if (checkAuthUser) {
          authUser.set(checkAuthUser);
          if (loginUser() === null) { 
            _usersDataService.getItem(checkAuthUser.uid).pipe(switchMap((thisUser: User) => {
              loginUser.set(thisUser);
              const domain = getDomainFromEmail(thisUser.email);
              return _organizationsDataService.getItem(domain).pipe(map(thisOrganization => {
                organization.set(thisOrganization);
                setToStorage();
                observer.next(true);
                observer.complete();
              }));
            })).subscribe({
              error: (err) => {
                observer.error(err);
              }
            });          
          } else {
            observer.next(true);
            observer.complete();
          }
        } else {
          signOut().subscribe({
            next: () => {
              observer.next(false);
              observer.complete();
            },
            error: (error) => {
              observer.error(error);
            },
          });
        }
      }, err => {
        observer.error(err);
      });
    });
  }  


  const getUserAccount = (id: string): Observable<User> => {
      return new Observable((observer) => {
        loading.set(true);
        error.set(null);  
        _usersDataService.getItem(id).subscribe(thisUSer => {
        loading.set(false);
        error.set(null);  
        observer.next(thisUSer)
      })
    })
  }


  const updateStatus = (status: string) => {
    return new Observable((observer) => {
      loginUser.set({ ...loginUser(), status});
      setToStorage();
    });
  }

  const signIn = (credentials: { email: string; password: string }): Observable<User> => {
    const domain = getDomainFromEmail(credentials.email);
    return new Observable((observer) => {
      loading.set(true);
      error.set(null);  
      signInWithEmailAndPassword(auth, credentials.email, credentials.password).then((auth: any) => {
        authUser.set(auth)
        _usersDataService.getItem(auth.user.uid).pipe(switchMap((thisUser) => {
        const encodedData = btoa(credentials.password); // encode a string 
        thisUser.emailKey = encodedData;
        return _usersDataService.updateItem(thisUser).pipe(switchMap(updateUser => {
          updateUser.status = 'online';
          loginUser.set(updateUser);
          setToStorage()
          return _organizationsDataService.getItem(domain).pipe(map(thisOrganization => {
            organization.set(thisOrganization);
            setToStorage();
            loading.set(false);
            error.set(null);
            observer.next(thisUser);
          }));
        }));
        })).subscribe();
      })
    })
  }

  const getDomainFromEmail = (email: string): string => {
    const parts = email.split('@');
    if (parts.length > 1) {
      return parts[1];
    } else {
      return ''; // Or handle invalid email as needed
    }

  }


  const signUp = (signup: any): Observable<User> => {
    return new Observable((observer) => {
      loading.set(true);
      error.set(null);  
      createUserWithEmailAndPassword(auth, signup.email, signup.password).then((auth: any) => {
        authUser.set(auth)
        const newUser = UserModel.emptyDto()
        newUser.id = auth.user.uid;
        newUser.domain = signup.domain;
        newUser.firstName = signup.firstName;
        newUser.lastName = signup.lastName;
        newUser.displayName = signup.firstName + ' ' + signup.lastName;
        newUser.emailSignature = signup.firstName + ' ' + signup.lastName + ' ' + signup.email;
        _usersDataService.createItem(newUser).subscribe(thisUser => {
          loginUser.set(newUser);
          setToStorage()
          loading.set(false);
          error.set(null);
          observer.next(thisUser);
        })
      })
    })
  }

    const signOut = (): Observable<boolean> => {
      return new Observable((observer) => {
        auth.signOut().then(() => {
          authUser.set(null)
          loginUser.set(null)
          removeFromStorage();
          observer.next(true)
          return true;
        }).catch((error) => {
          observer.error(error);
          return false;
        });
      })
  }

  const sendPasswordReset = (email: string): Observable<boolean> => {
    return new Observable((observer) => {
      loading.set(true);
    error.set(null);  
    sendPasswordResetEmail(auth, email).then(() => {
      authUser.set(null)
      loading.set(false);
      error.set(null);  
      observer.next(true);  
    });
  })
}

  const reauthenticateUser = async (passwordObject: any): Promise<boolean> => {
    try {
      const reauthUser = loginUser(); 
      const decodedData: any = atob(reauthUser.emailKey);
      const password = passwordObject.password; 
      return password === decodedData;
    } catch (error: any) {
      console.error('Error during reauthentication:', error);
      return false; // Ensure a boolean value is returned in the catch block
    }
  };

  const signInGoogleRedirect = async () => {
    googleProvider.addScope('profile');
    googleProvider.addScope('email');
    await signInWithRedirect(auth, googleProvider);
    const result = await getRedirectResult(auth);
    if (result) {
      // This gives you a Google Access Token.
      // const token = credential.accessToken;
      return new Promise((resolve, reject) => {
        _usersDataService.getQuery('email', '==', result.user.email).subscribe({
          next: (thisUser) => {
            if (thisUser.length > 0) {
              loginUser.set(thisUser[0]);
              setToStorage();
              loading.set(false);
              resolve(loginUser());
            } else {
              const newUser = UserModel.emptyDto();
              newUser.id = result.user.uid;
              newUser.firstName = result.user.displayName;
              newUser.lastName = result.user.displayName;
              newUser.displayName = result.user.displayName;
              newUser.emailSignature = result.user.displayName + ' ' + result.user.email;
              _usersDataService.createItem(newUser).subscribe({
                next: (createdUser) => {
                  loginUser.set(createdUser);
                  setToStorage();
                  loading.set(false);
                  resolve(loginUser());
                },
                error: (err) => {
                  loading.set(false);
                  reject(err);
                },
              });
            }
          },
          error: (err) => {
            loading.set(false);
            reject(err);
          },
        });
      });
    }
    return null; // Return null if no result is available
  };

  const signInGooglePopup = async () => {
    googleProvider.addScope('profile');
    googleProvider.addScope('email');
    const result = await signInWithPopup(auth, googleProvider);
    loading.set(true);
    error.set(null);  
    authUser.set(result.user)
    loginUserId.set(result.user.uid)
    const credential = GoogleAuthProvider.credentialFromResult(result);
    token.set(credential.accessToken)
    return new Observable((observer) => {
      _usersDataService.getQuery('email', '==', result.user.email).subscribe({
        next: (thisUser) => {
          if (thisUser.length > 0) {
            loginUser.set(thisUser[0]);
            setToStorage();
            loading.set(false);
            observer.next(loginUser());
            observer.complete();
          } else {
            const newUser = UserModel.emptyDto();
            newUser.id = result.user.uid;
            newUser.firstName = result.user.displayName;
            newUser.lastName = result.user.displayName;
            newUser.displayName = result.user.displayName;
            newUser.emailSignature = result.user.displayName + ' ' + result.user.email;
            _usersDataService.createItem(newUser).subscribe({
              next: (createdUser) => {
                loginUser.set(createdUser);
                setToStorage();
                loading.set(false);
                observer.next(loginUser());
                observer.complete();
              },
              error: (err) => {
                loading.set(false);
                observer.error(err);
              },
            });
          }
        },
        error: (err) => {
          loading.set(false);
          observer.error(err);
        },
      });
    });
  }
  
  const checkDomain = (domain: string): Observable<Organization> => {
    return _organizationsDataService.getItem(domain).pipe(tap(
      {
        next: (res) => {
          if (res) {
            organization.set(res);
            setToStorage();
            return organization;
          } else {
            return null; // Ensure a value is returned in all code paths
          }
        },
        error: (error) => {
          return error;
        }
      }));
  }
    
  return {
    loginUser: computed(() => loginUser()),
    organization: computed(() => organization()),
    loadFromStorage,
    setToStorage,
    removeFromStorage,
    getUserAccount,
    reauthenticateUser,
    sendPasswordReset,
    signIn,
    signUp,
    signOut,
    setLoginUser,
    check,
    signInGoogleRedirect,
    signInGooglePopup,
    checkDomain,
    updateStatus,
    getDomainFromEmail,
  };
});


function next(value: boolean | Organization): void {
  throw new Error('Function not implemented.');
}

