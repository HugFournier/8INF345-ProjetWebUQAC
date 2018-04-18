import {Etape} from "./Etape";

export class Voyage {

    public id: number;
    public nom: string;
    public etapes: Etape[];

    public constructor(id: number, nom: string, etapes: Etape[]){
        this.id = id;
        this.nom = nom;
        this.etapes = etapes;
    }

}