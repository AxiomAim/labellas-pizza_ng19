import { Routes } from "@angular/router";
import { ChefsComponent } from "./chefs.component";
import { ChefComponent } from "./chef/chef.component";

export const routes: Routes = [
    { path: '', component: ChefsComponent, pathMatch: 'full' },
    { path: ':id', component: ChefComponent }
];