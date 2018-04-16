import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {routing} from "./routing.module";
import {ConnexionComponent} from "./connexion/connexion.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {PanierComponent} from "./panier/panier.component";
import {DetailComponent} from "./detail/detail.component";
import {AdminComponent} from "./admin/admin.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthenticationService} from "./auth/auth.service";
import {AuthGuard} from "./auth/auth-guard";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        ConnexionComponent,
        AccueilComponent,
        PanierComponent,
        DetailComponent,
        AdminComponent],
    providers: [
      AuthenticationService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}