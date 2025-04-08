import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { Settings, SettingsService } from '@services/settings.service';
import { User } from '@services/data-service/user.model';
import { FirebaseAuthV2Service } from '../../auth-firebase/firebase-auth-v2.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [
        MatCardModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule,
        RouterLink,
        MatSlideToggleModule
    ],
})
export class LoginComponent implements OnInit {
  private _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
  @ViewChild('signInNgForm') signInNgForm: NgForm;

  public loginForm!: FormGroup;
  public hide = true;
  public bgImage: any;
  public settings: Settings;
  public loginUser: User;
  showAlert: boolean = false;

  public domain = new FormControl('');
  public isDomainControl: boolean = true;

  constructor(public fb: FormBuilder, public router: Router, private sanitizer: DomSanitizer, public settingsService: SettingsService) {
    this.settings = this.settingsService.settings;
  }

  ngOnInit(): void {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(images/others/login.jpg)');
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      rememberMe: false
    });
  }

  public onLoginFormSubmit(): void {
    // if (this.signInForm.valid) {
      this.signIn();
    //   console.log(this.signInForm.value)
    //   this.router.navigate(['/']);
    // }
  }

    checkDomain() {
      this.showAlert = false;
      const orgDomain = this._firebaseAuthV2Service.getDomainFromEmail(this.loginForm.controls.email.value);
      this._firebaseAuthV2Service.checkDomain(orgDomain).subscribe(  
      {
          next: 
          (res: any) => {
              if(res) {
                  this.domain.setValue(this.domain.value);
              }
          },
          error: (err) => {
              console.log("err", err);

              // Show the alert
              this.showAlert = true;
          },

      });
  }

  signIn(): void {
    // Return if the form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    // Disable the form
    this.loginForm.disable();

    // Hide the alert
    this.showAlert = false;

    //Sign in
    this._firebaseAuthV2Service.signIn(this.loginForm.value).subscribe(
        {
                next: (data: any) => {
                this.loginUser = data;
                this.router.navigate(['/account']);
            },
            error: (error) => { 
                // Re-enable the form
                this.loginForm.enable();    
                // Reset the form
                this.signInNgForm.resetForm();    
                // Set the alert
            }
        }           
    );
    //     data => {
    //     this.loginUser = data;
    //     this.localSignIn();    
    // })
}


googleSignInPopup(): void {
  // Hide the alert
  this.showAlert = false;         
  // Google Sign in
  this._firebaseAuthV2Service.signInGooglePopup()
    .then((thisloginUser: any) => {

      if(thisloginUser) {
          this.loginUser = thisloginUser;
      }
    })
}

googleSignInRedirect(): void {
  // Hide the alert
  this.showAlert = false;         
  // Google Sign in
  this._firebaseAuthV2Service.signInGoogleRedirect()
    .then((thisloginUser: any) => {
      console.log('thisloginUser', thisloginUser);

      if(thisloginUser) {
          this.loginUser = thisloginUser;
      }
    })
}


}