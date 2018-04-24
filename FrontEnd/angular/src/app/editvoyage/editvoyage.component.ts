import * as $ from 'jquery';
import {Component, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import { } from '@types/googlemaps';
import {Router, ActivatedRoute} from "@angular/router";

import {ServiceMaps} from "../service/serviceMaps";
import {Etape} from "../models/Etape";
import {PointDinteret} from "../models/PointDinteret";
import { Voyage } from '../models/Voyage';

@Component({
    selector : 'app-editvoyage',
    templateUrl: './editvoyage.component.html',
    styleUrls: [ './editvoyage.component.css' ]
})

export class EditVoyageComponent {           //implements OnInit {

    private serveur: ServiceMaps = new ServiceMaps();
    @ViewChild('gmap') gmapElement: any;
    private map: google.maps.Map;
    private voyage: Voyage;
    private idVoyage;
    private geocoder;

    public constructor(private router: Router, private route: ActivatedRoute){
        this.route.params.subscribe(params => {
            this.idVoyage = +params["id"];
            this.voyage = this.serveur.getVoyageById(this.idVoyage);
        });
        this.geocoder = new google.maps.Geocoder;
    }

    /*
        Modifie le nom du voyage
    */
    public updateNomVoyage(newNomVoyage: string){
        this.voyage.nom = newNomVoyage;
    }

    /*
        Ajoute une étape au voyage
    */
    public addEtape(newNomEtape: string){
        let position;
        this.geocoder.geocode(
            {address: newNomEtape},
            function(results, status){
                if(status === 'OK'){
                    position = results[0].geometry.location;
                } else {
                    window.alert("La ville renseignée n'existe pas. Status : " + status);
                }
            }
        );
        console.log(position);
    }

    /*
        Modifie une étape du voyage
    */
    public modifEtape(id: number, newNom: string){
        let index: number = this.voyage.etapes.indexOf(this.getEtape(id));
        this.voyage.etapes[index].nomVille = newNom;
    }

    /*
        Supprime une étape du voyage
    */
    public supprEtape(id: number){
        if(confirm("Êtes-vous sûr de vouloir supprimer cette étape ?") == true){
            let index: number = this.voyage.etapes.indexOf(this.getEtape(id));
            if(index > -1){
                this.voyage.etapes.splice(index, 1);
            }
        }
    }

    private getEtape(id: number){
        return this.serveur.getEtapeById(id);
    }
    
    public getVoyage(){
        return [this.serveur.getVoyageById(this.idVoyage)];
    }

    reroute(newRoute: string) : void {
        this.router.navigateByUrl('/'+newRoute, { skipLocationChange: false });
    }
}