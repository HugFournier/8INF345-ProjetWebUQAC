import {RouterModule, Routes} from '@angular/router';
import {ConnexionComponent} from './connexion/connexion.component';
import {AdminComponent} from "./admin/admin.component";
import {PanierComponent} from "./panier/panier.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {DetailComponent} from "./detail/detail.component";
import {NgModule} from "@angular/core";
import {AuthGuard} from "./auth/auth-guard";
import {MapComponent} from "./map/map.component";

const routes: Routes = [
    { path: 'auth', component: ConnexionComponent },
    { path: 'panier', component: PanierComponent },
    { path: '', component: MapComponent},
    { path: 'accueil', component: AccueilComponent},
    { path: 'accueil/:numeroDePage', component: AccueilComponent },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'detail/:id', component: DetailComponent },
    { path: 'map', component: MapComponent},
    { path: '**', redirectTo: '/notfound' }
];


export const routing = RouterModule.forRoot(routes,{
    enableTracing: true
});