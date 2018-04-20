import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {routing} from "./routing.module";
import {ConnexionComponent} from "./connexion/connexion.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthenticationService} from "./auth/auth.service";
import {AuthGuard} from "./auth/auth-guard";
import {MapComponent} from "./map/map.component";
import {EtapeComponent} from "./etape/etape.component";
import {VoyageComponent} from "./voyage/voyage.component";
import {CreateComponent} from "./create/create.component";

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
        MapComponent,
        EtapeComponent,
        VoyageComponent,
        CreateComponent,
    ],
    providers: [
      AuthenticationService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}