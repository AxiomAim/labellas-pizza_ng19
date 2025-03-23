// import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
    importProvidersFrom,
    ENVIRONMENT_INITIALIZER,
    EnvironmentProviders,
    Provider,
    inject,
} from '@angular/core';
//Angularfire
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { FirebaseAuthV2Service } from './firebase-auth-v2.service';
import { environment } from 'environments/environment';

export const firebaseProvideAuth = (): Array<Provider | EnvironmentProviders> => {
    return [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        provideAnalytics(() => getAnalytics()),
        provideFunctions(() => getFunctions()),
        provideAuth(() => getAuth()),
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(FirebaseAuthV2Service),
            multi: true,
        },
    ];

    
};
