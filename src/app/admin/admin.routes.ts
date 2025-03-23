import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';


export const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
            },
            { 
                path: 'menu-items', 
                loadChildren: () => import('./menu-items/menu-items.routes').then(p => p.routes) 
            },
            { 
                path: 'sales', 
                loadChildren: () => import('./sales/sales.routes').then(p => p.routes) 
            },
            {
                path: 'users',
                loadComponent: () => import('./users/users.component').then(c => c.UsersComponent),
                data: { breadcrumb: 'Users' }
            },
            {
                path: 'reservations',
                loadComponent: () => import('./reservations/reservations.component').then(c => c.ReservationsComponent),
                data: { breadcrumb: 'Reservations' }
            },
            {
                path: 'customers',
                loadComponent: () => import('./customers/customers.component').then(c => c.CustomersComponent),
                data: { breadcrumb: 'Customers' }
            },
            {
                path: 'coupons',
                loadComponent: () => import('./coupons/coupons.component').then(c => c.CouponsComponent),
                data: { breadcrumb: 'Coupons' }
            },
            {
                path: 'withdrawal',
                loadComponent: () => import('./withdrawal/withdrawal.component').then(c => c.WithdrawalComponent),
                data: { breadcrumb: 'Withdrawal Requests' }
            },
            {
                path: 'analytics',
                loadComponent: () => import('./analytics/analytics.component').then(c => c.AnalyticsComponent),
                data: { breadcrumb: 'Analytics' }
            },
            {
                path: 'refund',
                loadComponent: () => import('./refund/refund.component').then(c => c.RefundComponent),
                data: { breadcrumb: 'Refund Requests' }
            },
            {
                path: 'followers',
                loadComponent: () => import('./followers/followers.component').then(c => c.FollowersComponent),
                data: { breadcrumb: 'Followers' }
            },
            {
                path: 'support',
                loadComponent: () => import('./support/support.component').then(c => c.SupportComponent),
                data: { breadcrumb: 'Support' }
            },
            {
                path: 'reviews',
                loadComponent: () => import('./reviews/reviews.component').then(c => c.ReviewsComponent),
                data: { breadcrumb: 'Reviews' }
            }
        ]
    }
];