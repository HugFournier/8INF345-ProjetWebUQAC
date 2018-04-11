import { Component } from '@angular/core';
import {AuthenticationService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {Users} from "../models/Users";
import {AuthGuard} from "../auth/auth-guard";

@Component({
    selector : 'app-connexion',
    templateUrl: './connexion.component.html',
    styleUrls: [ './connexion.component.css' ]
})
export class ConnexionComponent {
    private model: Users = {username: '', password: ''};

    constructor(private router: Router, private authenticationService: AuthenticationService, private authGuard: AuthGuard){
        }

    login() {
        console.log(this.model);
        this.authenticationService.login(this.model);
        if(this.isConnected()){
            this.reroute("admin");
        }
    }

    isConnected(){
        return this.authGuard.isConnected();
    }

    reroute(newRoute: string) : void {
        this.router.navigateByUrl('/'+newRoute, { skipLocationChange: false });
    }

}