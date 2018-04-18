import * as $ from 'jquery';
import {Component, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import { } from '@types/googlemaps';
import {ActivatedRoute} from "@angular/router";

import {ServiceMaps} from "../service/serviceMaps";
import {Voyage} from "../models/Voyage";
import {Etape} from "../models/Etape";
import {PointDinteret} from "../models/PointDinteret";

@Component({
    selector : 'app-etape',
    templateUrl: './etape.component.html',
    styleUrls: [ './etape.component.css' ]
})

export class EtapeComponent implements OnInit {

    private serveur: ServiceMaps = new ServiceMaps();
    @ViewChild('gmap') gmapElement: any;
    private map: google.maps.Map;
    private idEtape: number = 0;

    public constructor(private route: ActivatedRoute){
        this.route.params.subscribe(params => {
            this.idEtape = +params["id"];
        });
    }

    public getEtape(){
        return [this.serveur.getEtapeById(this.idEtape)];
    }

    public ngOnInit() {
        var mapProp = {
          center: new google.maps.LatLng(46.7575555, -72.1884406),
          zoom: 11,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        //Centre la carte sur les coordonnées de l'étape et ajoute un marker
        this.map.setCenter(this.getEtape()[0].latLng);
        /*var marker = new google.maps.Marker({
            map: this.map,
            position: this.getEtape()[0].latLng,
            title: this.getEtape()[0].nomVille
        });*/
    }

}