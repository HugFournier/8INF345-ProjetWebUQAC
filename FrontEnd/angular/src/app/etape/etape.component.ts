import * as $ from 'jquery';
import {Component, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import { } from '@types/googlemaps';
import {Router, ActivatedRoute} from "@angular/router";

import {ServiceMaps} from "../service/serviceMaps";
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
    private etape: Etape;
    private geocoder;

    public constructor(private router: Router, private route: ActivatedRoute){
        this.route.params.subscribe(params => {
            this.idEtape = +params["id"];
            this.etape = this.getEtape()[0];
        });
    }

    public ngOnInit() : void {
        var mapProp = {
          center: new google.maps.LatLng(46.7575555, -72.1884406),
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        //Centre la carte sur les coordonnées de l'étape et ajoute un marker
        this.map.setCenter(this.getEtape()[0].latLng);
        this.geocoder = new google.maps.Geocoder;
        for(let pi of this.getEtape()[0].pointInteret){
            this.addMarkerPI(pi);
        }
    }

    /*
        Ajoute un marker pour chaque points d'intérêts
        Ajoute une fenêtre d'information avec la description du PI lors d'un click sur le marker
    */
    public addMarkerPI(pi: PointDinteret) : void{  
        let mapGeocode = this.map;
        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h4 id="firstHeading" class="firstHeading">' + pi.nom + '</h4>'+
            '<div id="bodyContent">'+
            '<p>' + pi.description + '</p>' +
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 350
        });

        this.geocoder.geocode(
            { address: pi.adresse },
            function(results, status){
                if(status === 'OK'){
                    var marker = new google.maps.Marker({
                        map: mapGeocode,
                        position: results[0].geometry.location,
                        title: pi.nom
                    });
                    marker.addListener('click', function() {
                        infowindow.open(mapGeocode, marker);
                    });
                } else {
                    window.alert("La ville renseignée n'existe pas. Status : " + status);
                }
            }
        ); 
    }

    public addPointInteret(newNomPI: string, newAdressePI: string, newDescriptionPI: string){
        let pi = new PointDinteret(45, newNomPI, newAdressePI, newDescriptionPI);
        this.getEtape()[0].ajouterPointInteret(pi);
        this.addMarkerPI(pi);
        this.clearForm();
    }

    public supprPointInteret(id: number){
        let index = this.getEtape()[0].pointInteret.indexOf(this.getEtape()[0].getPointInteret(id));
        this.getEtape()[0].pointInteret.splice(index, 1);
    }

    public center(){
        this.route.params.subscribe(params => {
            this.idEtape = +params["id"];
        });
        this.map.setCenter(this.getEtape()[0].latLng);
    }

    public reroute(newRoute: string) : void {
        this.router.navigateByUrl('/'+newRoute, { skipLocationChange: false });
        this.map.setCenter(this.getEtapeSuivante().latLng);
        this.map.setZoom(12);
        for(let pi of this.getEtapeSuivante().pointInteret){
            this.addMarkerPI(pi);
        }
    }

    public getEtape(){
        return [this.serveur.getEtapeById(this.idEtape)];
    }

    public getEtapeSuivante(){
        return this.serveur.getEtapeById(this.getEtape()[0].idSuivante);
    }

    private clearForm(){
        $('#newNomPI').val('');
        $('#newAdressePI').val('');
        $('#newDescriptionPI').val('');
    }

    //Permet de revenir un page en arrière
    public backward(){
        window.history.back();
    }

}