import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import { HttpClientModule } from '@angular/common/http';
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
import {EditVoyageComponent} from "./editvoyage/editvoyage.component";
import {RegisterComponent} from "./register/register.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        routing,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        ConnexionComponent,
        RegisterComponent,
        MapComponent,
        EtapeComponent,
        VoyageComponent,
        CreateComponent,
        EditVoyageComponent,
    ],
    providers: [
      AuthenticationService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}