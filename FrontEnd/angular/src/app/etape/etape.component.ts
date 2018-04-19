import * as $ from 'jquery';
import {Component, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import { } from '@types/googlemaps';
import {Router, ActivatedRoute} from "@angular/router";

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

    public constructor(private router: Router, private route: ActivatedRoute){
        this.route.params.subscribe(params => {
            this.idEtape = +params["id"];
        });
    }

    public getEtape(){
        return [this.serveur.getEtapeById(this.idEtape)];
    }

    public getEtapeSuivante(){
        return this.serveur.getEtapeById(this.getEtape()[0].idSuivante);
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
        for(let pi of this.getEtape()[0].pointInteret){
            this.addWaypoint(pi);
        }
    }

    public addWaypoint(pi: PointDinteret){
        var marker = new google.maps.Marker({
            map: this.map,
            position: pi.latLng,
            title: pi.nom
        });
    }

    public reroute(newRoute: string) : void {
        this.router.navigateByUrl('/'+newRoute, { skipLocationChange: false });
        this.map.setCenter(this.getEtapeSuivante().latLng);
    }

}