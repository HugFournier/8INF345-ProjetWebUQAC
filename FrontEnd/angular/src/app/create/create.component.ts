import * as $ from 'jquery';
import {Component} from '@angular/core';
import {ViewChild} from '@angular/core';
import { } from '@types/googlemaps';
import {Router, ActivatedRoute} from "@angular/router";

import {ServiceMaps} from "../service/serviceMaps";
import {Voyage} from "../models/Voyage";
import {Etape} from "../models/Etape";
import {PointDinteret} from "../models/PointDinteret";

@Component({
    selector : 'app-create',
    templateUrl: './create.component.html',
    styleUrls: [ './create.component.css' ]
})

export class CreateComponent{

    private serveur: ServiceMaps = new ServiceMaps();
    private voyage: Voyage = { id: 10, name: "", step: [] };

    public constructor(private router: Router){

    }

    public creerVoyage(){
        ServiceMaps.listeVoyageStub.push(this.voyage);
        this.reroute('voyage/'+this.voyage.id);
    }

    reroute(newRoute: string) : void {
        this.router.navigateByUrl('/'+newRoute, { skipLocationChange: false });
    }

}