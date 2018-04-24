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
    //public etape: Etape = new Etape(32, "", null, "DRIVING", "", false, null, new Array<PointDinteret>());

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
            //Si ce n'est pas la première étape, on ajoute au tableau de waypoints
            if(i != 0){
                /*let mapGeocode = this.map;
                this.geocoder.geocode(
                    {address: etape.nomVille},
                    function(results, status){
                        if(status === 'OK'){
                            this.tableauWaypoints.push({
                                location: results[0].geometry.location,
                                stopover: true
                            });
                        } else {
                            window.alert("La ville renseignée n'existe pas. Status : " + status);
                        }
                    }
                );*/
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