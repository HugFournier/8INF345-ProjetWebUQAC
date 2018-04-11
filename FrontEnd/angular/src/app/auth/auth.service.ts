import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import {Users, Token} from "../models/Models";
import * as moment from 'moment';

@Injectable()
export class AuthenticationService {

    constructor(private router: Router) {
    }

    login(model: Users) : void {
        console.log(model);
        if(model.username == 'admin' && model.password == 'admin'){
            let now = moment();
            let expDate = now.add("30", 'minutes');
            let token : Token = {
                'token':"myincredibletoken",
                'exp': expDate.format('YYYY-MM-DD HH:mm:ss')
            };
            localStorage.setItem('token', JSON.stringify(token));
        }
    }

    logout() : void {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
    }
}