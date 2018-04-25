import * as $ from 'jquery';
import {Component, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import { } from '@types/googlemaps';
import {Router, ActivatedRoute} from "@angular/router";

import {ServiceMaps} from "../service/serviceMaps";
import {Voyage} from "../models/Voyage";
import {Etape} from "../models/Etape";
import {PointDinteret} from "../models/PointDinteret";
import { Stats } from 'fs';

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
    private geocoder;

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
          center: new google.maps.LatLng(20, -15),
          zoom: 2,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        directionsDisplay.setMap(this.map);
        this.geocoder = new google.maps.Geocoder;
        //Vérifie si le voyage contient des étapes. Si oui, affiche les étapes. Si non, ne fais rien.
        if(this.getVoyage()[0].etapes.length != 0)
            this.calculateAndDisplayRoute(directionsService, directionsDisplay);
    }

    /*
        Trace le trajet du RoadTrip
    */
    public calculateAndDisplayRoute(directionsService = null, directionsDisplay= null){
        let i = 0, depart = "", arrive = "";
        for(let etape of this.getVoyage()[0].etapes){
            //Si c'est la dernière étape on défini le point d'arrivé
            if(i == (this.getVoyage()[0].etapes.length - 1)){
                arrive = etape.nomVille;
                break;
            }
            //Si ce n'est pas la première étape, on ajoute l'étape au tableau de waypoints
            if(i != 0){
                /*var latlng;
                this.getLocation(etape.nomVille, function(location) {
                    latlng = location;
                    tabWaypoints.push({
                        location: latlng,
                        stopover: true
                    });
                });*/
                this.addressToLocation(etape.nomVille, this.addTabWaypoint)
                this.tableauWaypoints.push({
                    location: etape.latLng,
                    stopover: true
                });
            } else { depart = etape.nomVille; } //Sinon on défini le point de départ
            i++;
        }
        var tabWaypoints = this.tableauWaypoints; //Affection nécessaire pour pouvoir .pop() dans function(response, status)

        directionsService.route({
            origin: depart,
            destination: arrive,
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

    private addTabWaypoint(location){

    }

    /*
        Permet de récupérer un LatLng à partir d'une adresse passée en paramètres avec fonction de callback
    */
    private addressToLocation(addr, callback){
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode(
            {address: addr},
            function(results, status){

                var resultLocations = [];

                if(status == google.maps.GeocoderStatus.OK){
                    if(results){
                        var result = results[0];
                        resultLocations.push(
                            {
                                text: result.formatted_address,
                                addressStr: result.formatted_address,
                                location: result.geometry.location
                            }
                        );
                    };
                } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS){
                    alert("Pas de résultat");
                }

                if(resultLocations.length > 0){
                    callback(resultLocations);
                } else {
                    callback(null);
                }
            }
        );
    }

    /*private getLocation(addr, fn){
        this.geocoder.geocode( {address: addr}, function(results, status) {
            fn(results[0].geometry.location);
        });
    }*/

    /*
        Utilise un Geocoder pour déterminer Latlng à partir du nom de ville renseignée
    */
    /*public ajouterEtape(){
        let mapGeocode = this.map;
        let address = this.etape.nomVille;
        let position;
        this.geocoder.geocode(
            {address: address},
            function(results, status){
                if(status === 'OK'){
                    position = results[0].geometry.location;
                } else {
                    window.alert("La ville renseignée n'existe pas. Status : " + status)
                }
            }
        );
        console.log(position);
    }*/

    public getVoyage(){
        return [this.serveur.getVoyageById(this.idVoyage)];
    }

    reroute(newRoute: string) : void {
        this.router.navigateByUrl('/'+newRoute, { skipLocationChange: false });
    }

}