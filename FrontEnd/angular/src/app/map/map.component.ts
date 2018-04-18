import * as $ from 'jquery';
import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector : 'app-map',
    templateUrl: './map.component.html',
    styleUrls: [ './map.component.css' ]
})

export class MapComponent{

    @ViewChild('gmap') gmapElement: any;
    map: google.maps.Map;

    latitude: any;
    longitude: any;
    geocoder = new google.maps.Geocoder;
    geo;

    ngOnInit() {
        var mapProp = {
          center: new google.maps.LatLng(46.7575555, -72.1884406),
          zoom: 7,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    }

      //Permet de retrouver lat et lng à partir du nom de ville rentré
    geocode(){
        /*let mapgeocode = this.map;
        this.geocoder.geocode(
            {'address': this.geo}, 
            function(results, status) {
                if (status === 'OK') {
                //alert(results[0].geometry.location);
                mapgeocode.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: mapgeocode,
                    position: results[0].geometry.location
                });
                } else {
                window.alert('Geocode was not successful for the following reason: ' + status);
                }
            }
        );*/
    }

    //Ajoute un marqueur
    setMarker(){
        var marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.latitude, this.longitude),
        map: this.map,
        title: 'Hello World!'
        });
    }

    //Centre carte au LatLng envoyée
    setCenter() {
        this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
    }

}