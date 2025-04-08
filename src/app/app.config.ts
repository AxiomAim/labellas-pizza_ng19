import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from "@angular/core";
import {PreloadAllModules, provideRouter, withPreloading, withViewTransitions} from "@angular/router";
import {DatePipe} from "@angular/common";

import {routes} from "./app.routes";
import {provideClientHydration} from "@angular/platform-browser";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {HttpClient, provideHttpClient, withFetch} from "@angular/common/http";

import {environment} from "../environments/environment";
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {OverlayContainer} from "@angular/cdk/overlay";
import {CustomOverlayContainer} from "./theme/utils/custom-overlay-container";
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, environment.url + "/i18n/", ".json");
}

// import {InMemoryWebApiModule} from "angular-in-memory-web-api";
// import {UsersData} from "./common/data/user-data";
import {DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter} from "@angular/material/core";
// import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
// import {getAuth, provideAuth} from "@angular/fire/auth";
// import {getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService} from "@angular/fire/analytics";
// import {initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck} from "@angular/fire/app-check";
// import {getFirestore, provideFirestore} from "@angular/fire/firestore";
// import {getFunctions, provideFunctions} from "@angular/fire/functions";
// import {getPerformance, providePerformance} from "@angular/fire/performance";
// import {getStorage, provideStorage} from "@angular/fire/storage";
// import {getVertexAI, provideVertexAI} from "@angular/fire/vertexai-preview";
// import { provideAuthFirebase } from "./core/auth-firebase/auth-firebase.provider";

export const appConfig: ApplicationConfig = {
    providers: [
        // provideZoneChangeDetection({ eventCoalescing: true }),
        provideHttpClient(withFetch()),
        provideRouter(
            routes,
            withViewTransitions(),
            withPreloading(PreloadAllModules) // comment this line for enable lazy-loading
        ),
        provideClientHydration(),
        provideAnimationsAsync(),
        importProvidersFrom([
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient],
                },
            }),
            // InMemoryWebApiModule.forRoot(UsersData, {passThruUnknownUrl: true, delay: 1000}),
        ]),
        DatePipe,
        {provide: OverlayContainer, useClass: CustomOverlayContainer},
        {provide: DateAdapter, useClass: NativeDateAdapter},
        // provideAuthFirebase(),
        // provideFirebaseApp(() =>
        //     initializeApp({
        //         projectId: "susi-pages",
        //         appId: "1:339534492800:web:4866769cd46f6df8df6265",
        //         databaseURL: "https://susi-pages.firebaseio.com",
        //         storageBucket: "susi-pages.appspot.com",
        //         apiKey: "AIzaSyDzUoBiw4Lu4O8sErFQ9tRmiuum0Qx2g7c",
        //         authDomain: "susi-pages.firebaseapp.com",
        //         messagingSenderId: "339534492800",
        //     })
        // ),
        // provideAuth(() => getAuth()),
        // provideAnalytics(() => getAnalytics()),
        // ScreenTrackingService,
        // UserTrackingService,
        // provideAppCheck(() => {
        //     const provider = new ReCaptchaEnterpriseProvider("6Le5s1gpAAAAALQiyM6rGSB5CYgmbEQwRjLi-sW7");
        //     return initializeAppCheck(undefined, {provider, isTokenAutoRefreshEnabled: true});
        // }),
        // provideFirestore(() => getFirestore()),
        // provideFunctions(() => getFunctions()),
        // providePerformance(() => getPerformance()),
        // provideStorage(() => getStorage()),
        // provideVertexAI(() => getVertexAI()),
    ],
};
