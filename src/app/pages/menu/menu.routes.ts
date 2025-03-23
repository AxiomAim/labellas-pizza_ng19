import { Routes } from "@angular/router";
import { MenuComponent } from "./menu.component";
import { MenuSingleComponent } from "./menu-single/menu-single.component";

export const routes: Routes = [
    { path: '', component: MenuComponent, pathMatch: 'full' },
    { path: ':id', component: MenuSingleComponent }
];