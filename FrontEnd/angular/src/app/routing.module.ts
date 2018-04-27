import {RouterModule, Routes} from '@angular/router';
import {ConnexionComponent} from './connexion/connexion.component';
import {NgModule} from "@angular/core";
import {AuthGuard} from "./auth/auth-guard";
import {AppComponent} from "./app.component";
import {EtapeComponent} from "./etape/etape.component";
import {VoyageComponent} from "./voyage/voyage.component";
import {CreateComponent} from "./create/create.component";
import {EditVoyageComponent} from "./editvoyage/editvoyage.component";

const routes: Routes = [
    { path: 'auth', component: ConnexionComponent },
    //{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'etape/:id', component: EtapeComponent},
    { path: 'voyage/:id', component: VoyageComponent},
    { path: 'create', component: CreateComponent},
    { path: 'editvoyage/:id', component: EditVoyageComponent},
    { path: '**', redirectTo: '/notfound' }
];


export const routing = RouterModule.forRoot(routes,{
    enableTracing: true
});