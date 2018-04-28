import { } from '@types/googlemaps';

export class PointDinteret {

    public id: number;
    public name: string;
    public address: string;
    public description: string;

    public constructor(id: number, nom: string, adresse: string, description: string){
        this.id = id;
        this.name = nom;
        this.address = adresse;
        this.description = description;
    }

}