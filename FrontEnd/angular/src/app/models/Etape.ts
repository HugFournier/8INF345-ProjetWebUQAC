import { } from '@types/googlemaps';
import {PointDinteret} from '../models/PointDinteret';

export class Etape {

    public id: number;
    public nomVille: string;
    public latLng: google.maps.LatLng;
    public moyenDeTransport: string;
    public date: string;
    public estPremiereEtape: boolean;
    public idSuivante: number;
    public pointInteret: PointDinteret[];
    
    public constructor(id: number, nomVille: string, latLng : google.maps.LatLng, moyenDeTransport: string, date: string, estPremiereEtape: boolean, idSuivante: number, pointInteret: PointDinteret[]){
        this.id = id;
        this.nomVille = nomVille;
        this.latLng = latLng;
        this.moyenDeTransport = moyenDeTransport;
        this.date = date;
        this.estPremiereEtape = estPremiereEtape;
        this.idSuivante = idSuivante;
        this.pointInteret = pointInteret;
    }

    public ajouterPointInteret(ptInt: PointDinteret){
        this.pointInteret.push(ptInt);
    }

    public getPointInteret(id: number){
        return this.pointInteret.find(e => e.id == id);
    }

    public supprimerPointInteret(ptInt: PointDinteret){
        let index: number = this.pointInteret.indexOf(ptInt);
        this.pointInteret.splice(index, 1);
    }

}