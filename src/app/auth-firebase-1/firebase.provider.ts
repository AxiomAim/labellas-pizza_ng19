// import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
    importProvidersFrom,
    ENVIRONMENT_INITIALIZER,
    EnvironmentProviders,
    Provider,
    inject,
} from '@angular/core';
import { FirestoreService } from './firestore.service';
// import { AppSettings } from 'app/app.settings';
// import { AppService } from 'app/app.service';

export const firebaseProvideAuth = (): Array<Provider | EnvironmentProviders> => {
    return [
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(FirestoreService),
            multi: true,
        },
    ];
    // return [
    //     importProvidersFrom([
    //         FirestoreService,
    //         UserDataService,
    //         // AppSettings,
    //         // AppService
    //     ]),        
    // ];
};
