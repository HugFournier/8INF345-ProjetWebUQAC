import {Etape} from "./Etape";

export class Voyage {

    public id: number;
    public name: string;
    public step: Etape[];

    public constructor(id: number, nom: string, etapes: Etape[]){
        this.id = id;
        this.name = nom;
        this.step = etapes;
    }

    

}