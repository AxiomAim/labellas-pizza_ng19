import { Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
            },
            {
                path: 'about',
                loadComponent: () => import('./about/about.component').then(c => c.AboutComponent)
            },
            {
                path: 'contact',
                loadComponent: () => import('./contact/contact.component').then(c => c.ContactComponent)
            },
            {
                path: 'account',
                loadChildren: () => import('./account/account.routes').then(p => p.routes)
            },
            {
                path: 'cart',
                loadComponent: () => import('./cart/cart.component').then(c => c.CartComponent)
            },
            {
                path: 'checkout',
                loadComponent: () => import('./checkout/checkout.component').then(c => c.CheckoutComponent)
            },
            {
                path: 'chefs',
                loadChildren: () => import('./chefs/chefs.routes').then(p => p.routes)
            },
            {
                path: 'faq',
                loadComponent: () => import('./faq/faq.component').then(c => c.FaqComponent)
            },
            {
                path: 'login',
                loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
            },   
            {
                path: 'register',
                loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent)
            }, 
            {
                path: 'menu',
                loadChildren: () => import('./menu/menu.routes').then(p => p.routes)
            },  
            {
                path: 'reservation',
                loadComponent: () => import('./reservation/reservation.component').then(c => c.ReservationComponent)
            }, 
            {
                path: 'terms-conditions',
                loadComponent: () => import('./terms-conditions/terms-conditions.component').then(c => c.TermsConditionsComponent)
            } 
        ]
    }
];