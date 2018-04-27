import * as $ from 'jquery';
import {Component} from '@angular/core';
import {ViewChild} from '@angular/core';
import { } from '@types/googlemaps';
import {Router, ActivatedRoute} from "@angular/router";

import {ServiceMaps} from "../service/serviceMaps";
import {Voyage} from "../models/Voyage";

@Component({
    selector : 'app-map',
    templateUrl: './map.component.html',
    styleUrls: [ './map.component.css' ]
})

export class MapComponent{

    private serveur: ServiceMaps = new ServiceMaps();

    public constructor(private router: Router, private route: ActivatedRoute){
        this.route.params.subscribe(params => {
            console.log(params["id"]);
            console.log(params["type"]);
            this.reroute(params["type"]+"/"+params["id"]);
        });
    }

    /*
        Return tous les voyages pour les afficher
    */
    public getVoyages(){
        return this.serveur.returnVoyageStub();
    }

    reroute(newRoute: string) : void {
        this.router.navigateByUrl('/'+newRoute, { skipLocationChange: false });
    }

}