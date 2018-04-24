import { } from '@types/googlemaps';

export class PointDinteret {

    public id: number;
    public nom: string;
    public adresse: string;
    public description: string;

    public constructor(id: number, nom: string, adresse: string, description: string){
        this.id = id;
        this.nom = nom;
        this.adresse = adresse;
        this.description = description;
    }

}