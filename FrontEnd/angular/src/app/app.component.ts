import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "./auth/auth.service";
import {AuthGuard} from "./auth/auth-guard";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent {
    constructor(private router: Router, private authService: AuthenticationService, private authGuard: AuthGuard){

    }

    reroute(newRoute: string) : void {
        this.router.navigateByUrl('/'+newRoute, { skipLocationChange: false });
    }

    isConnected() : boolean {
        return this.authGuard.isConnected();
    }

    logout() : void {
        this.authService.logout();
        this.reroute('accueil')
    }
}