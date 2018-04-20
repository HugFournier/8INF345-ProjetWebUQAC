import {RouterModule, Routes} from '@angular/router';
import {ConnexionComponent} from './connexion/connexion.component';
import {NgModule} from "@angular/core";
import {AuthGuard} from "./auth/auth-guard";
import {MapComponent} from "./map/map.component";
import {EtapeComponent} from "./etape/etape.component";
import {VoyageComponent} from "./voyage/voyage.component";
import {CreateComponent} from "./create/create.component";

const routes: Routes = [
    { path: 'auth', component: ConnexionComponent },
    { path: '', component: MapComponent},
    //{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'etape/:id', component: EtapeComponent},
    { path: 'voyage/:id', component: VoyageComponent},
    { path: 'create', component: CreateComponent},
    { path: '**', redirectTo: '/notfound' }
];


export const routing = RouterModule.forRoot(routes,{
    enableTracing: true
});