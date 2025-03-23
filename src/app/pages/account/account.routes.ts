import { Routes } from "@angular/router";
import { AccountComponent } from "./account.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProfileComponent } from "./profile/profile.component";
import { PasswordChangeComponent } from "./password-change/password-change.component";
import { AddressesComponent } from "./addresses/addresses.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { ReservationsComponent } from "./reservations/reservations.component";
import { OrdersComponent } from "./orders/orders.component";
import { OrderComponent } from "./orders/order/order.component";

export const routes: Routes = [
    {
        path: '',
        component: AccountComponent, children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'password-change', component: PasswordChangeComponent },
            { path: 'addresses', component: AddressesComponent },
            { path: 'favorites', component: FavoritesComponent },
            { path: 'reservations', component: ReservationsComponent },
            { path: 'orders', component: OrdersComponent },
            { path: 'orders/:id', component: OrderComponent }
        ]
    }
];