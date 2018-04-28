import * as $ from 'jquery';
import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "./auth/auth.service";
import {AuthGuard} from "./auth/auth-guard";
import {ServiceMaps} from "./service/serviceMaps";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent {
    constructor(private router: Router, private authService: AuthenticationService, private authGuard: AuthGuard){
        if(!this.isConnected()){
            this.reroute('auth');
        }
    }

    reroute(newRoute: string) : void {
        this.router.navigateByUrl('/'+newRoute, { skipLocationChange: false });
    }

    isConnected() : boolean {
        return this.authGuard.isConnected();
    }

    logout() : void {
        this.authService.logout();
        this.reroute('auth')
    }

    private serveur: ServiceMaps = new ServiceMaps();
    

    /*
        Return tous les voyages pour les afficher
    */
    public getVoyages(){
        return this.serveur.returnVoyageStub();
    }
}