import { Article } from "./Article";
import {Service} from "../service/Service";

export class ArticlePanier {

    constructor(private id: number, private quantite: number){

    }

    getID(): number{
        return this.id;
    }

    getQuantite(): number{
        return this.quantite;
    }

    setQuantite(value: number){
        this.quantite = value;
    }

    getArticle() : Article{
        return new Service().getArticleParID(this.id);
    }

    //Méthode permettant de calculer le sous-total en fonction du nombre d'articles
    calculerTotal(): number{
        return this.getArticle().getPrix() * this.quantite; 
    }

}