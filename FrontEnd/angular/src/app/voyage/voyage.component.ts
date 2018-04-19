import * as $ from 'jquery';
import {Component, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import { } from '@types/googlemaps';
import {Router, ActivatedRoute} from "@angular/router";

import {ServiceMaps} from "../service/serviceMaps";
import {Voyage} from "../models/Voyage";
import {Etape} from "../models/Etape";
import {PointDinteret} from "../models/PointDinteret";
import { start } from 'repl';

@Component({
    selector : 'app-voyage',
    templateUrl: './voyage.component.html',
    styleUrls: [ './voyage.component.css' ]
})

export class VoyageComponent{

    private serveur: ServiceMaps = new ServiceMaps();
    @ViewChild('gmap') gmapElement: any;
    private map: google.maps.Map;
    private idVoyage;
    private tableauWaypoints = [];

    public constructor(private router: Router, private route: ActivatedRoute){
        this.route.params.subscribe(params => {
            this.idVoyage = +params["id"];
        });
    }

    /*
        Initialisation de la map et affiche le parcours du road trip
    */
    public ngOnInit() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var mapProp = {
          center: new google.maps.LatLng(46.7575555, -72.1884406),
          zoom: 6,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        directionsDisplay.setMap(this.map);
        //this.map.setCenter(this.getVoyage()[0].etapes[0].latLng);
        this.calculateAndDisplayRoute(directionsService, directionsDisplay);
    }

    /*
        Trace le trajet du RoadTrip
    */
    public calculateAndDisplayRoute(directionsService = null, directionsDisplay= null){
        let i = 0, depart = "";
        for(let etape of this.getVoyage()[0].etapes){
            if(i != 0){
                this.tableauWaypoints.push({
                    location: etape.latLng,
                    stopover: true
                });
            } else { depart = etape.nomVille; }
            i++;
        }

        var tabWaypoints = this.tableauWaypoints;

        directionsService.route({
            origin: depart,
            destination: depart,
            waypoints: this.tableauWaypoints,
            optimizeWaypoints: false,
            travelMode: 'DRIVING'
        }, function(response, status) {
            if (status === 'OK') {
              directionsDisplay.setDirections(response);
            } else {
              tabWaypoints.pop();
              alert('Directions request failed due to ' + status);
            }
          });
    }

    public getVoyage(){
        return [this.serveur.getVoyageById(this.idVoyage)];
    }

    reroute(newRoute: string) : void {
        this.router.navigateByUrl('/'+newRoute, { skipLocationChange: false });
    }

}