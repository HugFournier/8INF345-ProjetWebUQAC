import {RouterModule, Routes} from '@angular/router';
import {ConnexionComponent} from './connexion/connexion.component';
import {NgModule} from "@angular/core";
import {AuthGuard} from "./auth/auth-guard";
import {AppComponent} from "./app.component";
import {EtapeComponent} from "./etape/etape.component";
import {VoyageComponent} from "./voyage/voyage.component";
import {CreateComponent} from "./create/create.component";
import {EditVoyageComponent} from "./editvoyage/editvoyage.component";
import { MapComponent } from './map/map.component';
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
    { path: 'auth', component: ConnexionComponent },
    //{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent},
    { path: 'etape/:id', component: EtapeComponent, canActivate: [AuthGuard]},
    { path: 'voyage/:id', component: VoyageComponent, canActivate: [AuthGuard]},
    { path: 'redirect/:type/:id', component: MapComponent, canActivate: [AuthGuard]},
    { path: 'create', component: CreateComponent, canActivate: [AuthGuard]},
    { path: 'editvoyage/:id', component: EditVoyageComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '/notfound' }
];


export const routing = RouterModule.forRoot(routes,{
    enableTracing: true
});