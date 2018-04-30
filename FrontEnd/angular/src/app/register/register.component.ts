import { Component } from '@angular/core';
import {AuthenticationService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {Users} from "../models/Users";
import {AuthGuard} from "../auth/auth-guard";

@Component({
    selector : 'app-register',
    templateUrl: './register.component.html',
    styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

    constructor(private router: Router, private authenticationService: AuthenticationService, private authGuard: AuthGuard){
    }

    public register(username: string, pass1: string, pass2: string){
        if(!(/^\s*$/.test(username) || /^\s*$/.test(pass1) || /^\s*$/.test(pass2))){
            if(pass1 == pass2) {
                //Ajout du user en base
            } else {
                alert("Les mots de passe doivent être identiques !");
            }
        } else {
            alert("Veuillez renseigner tous les champs.");
        }
    }

    isConnected(){
        return this.authGuard.isConnected();
    }

    reroute(newRoute: string) : void {
        this.router.navigateByUrl('/'+newRoute, { skipLocationChange: false });
    }

}