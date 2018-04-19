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
    selector : 'app-map',
    templateUrl: './map.component.html',
    styleUrls: [ './map.component.css' ]
})

export class MapComponent{

    private serveur: ServiceMaps = new ServiceMaps();
    /*@ViewChild('gmap') gmapElement: any;
    private map: google.maps.Map;

    public latitude: any;
    public longitude: any;
    private geocoder: any;
    public geo: any;*/

    public constructor(private router: Router){

    }

    /*
        Return tous les voyages pour les afficher
    */
    public getVoyages(){
        return this.serveur.returnVoyageStub();
    }

    /*
        Initialise la map
    */
    /*public ngOnInit() {
        var mapProp = {
          center: new google.maps.LatLng(46.7575555, -72.1884406),
          zoom: 7,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        this.geocoder = new google.maps.Geocoder;
    }*/

    /*
        Permet de retrouver lat et lng à partir du nom de ville rentrée
        Centre et ajoute un marqueur sur la ville rentrée
    */
    /*public geocode(){
        let mapgeocode = this.map;
        var address = this.geo;
        this.geocoder.geocode(
            {'address': address}, 
            function(results, status) {
                if (status === 'OK') {
                    //alert(results[0].geometry.location); //Décommenter pour trouver LatLng d'une ville
                    mapgeocode.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: mapgeocode,
                        position: results[0].geometry.location,
                        title: address
                    });
                } else {
                window.alert('Geocode was not successful for the following reason: ' + status);
                }
            }
        );
    }*/

    //Ajoute un marqueur
    /*public setMarker(){
        var marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.latitude, this.longitude),
        map: this.map,
        title: ''
        });
    }*/

    //Centre carte au LatLng envoyée
    /*public setCenter() {
        this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
    }*/

    reroute(newRoute: string) : void {
        this.router.navigateByUrl('/'+newRoute, { skipLocationChange: false });
    }

}