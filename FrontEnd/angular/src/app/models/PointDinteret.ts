import { } from '@types/googlemaps';

export class PointDinteret {

    public id: number;
    public nom: string;
    public latLng: google.maps.LatLng;
    public description: string;

    public constructor(id: number, nom: string, latLng: google.maps.LatLng, description: string){
        this.id = id;
        this.nom = nom;
        this.latLng = latLng;
        this.description = description;
    }

}