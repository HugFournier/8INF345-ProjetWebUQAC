import { } from '@types/googlemaps';
import {PointDinteret} from '../models/PointDinteret';

export class Etape {

    public id: number;
    public cityName: string;
    public latLng: google.maps.LatLng;
    public transportType: string;
    public startingTime: string;
    public isFirstStep: boolean;
    public idSuivante: number;
    public pointInteret: PointDinteret[];
    
    public constructor(id: number, nomVille: string, latLng : google.maps.LatLng, moyenDeTransport: string, date: string, estPremiereEtape: boolean, idSuivante: number, pointInteret: PointDinteret[]){
        this.id = id;
        this.cityName = nomVille;
        this.latLng = latLng;
        this.transportType = moyenDeTransport;
        this.startingTime = date;
        this.isFirstStep = estPremiereEtape;
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