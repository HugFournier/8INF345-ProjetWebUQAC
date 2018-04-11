import {Article} from "./Article";
import {ArticlePanier} from "./ArticlePanier";

export class Panier{

    private items:ArticlePanier[];

    constructor(){
        this.items = new Array();
    }

    public addItem(id: number, quantite : number = 1){
        let articlePanier: ArticlePanier = this.items.find(articlePanier => articlePanier.getID() === id);
        if(articlePanier == undefined){
            this.items.push(new ArticlePanier(id, quantite>0?quantite:1));
        } else {
            if(articlePanier.getQuantite() + quantite>0){
                articlePanier.setQuantite(articlePanier.getQuantite() + quantite);
            }
        }
    }

    public removeItem(id: number){
        let articlePanier: ArticlePanier = this.items.find(articlePanier => articlePanier.getID() === id);
        let index : number = this.items.indexOf(articlePanier);
        if(index > -1)
            this.items.splice(index,1);
    }

    public getArticlesPanier() : ArticlePanier[]{
        return this.items;
    }

    public calculerTotal():number{
        let total : number = 0;
        this.items.forEach(element => {
            total += element.calculerTotal();
        });
        return total;
    }

    public estVide():boolean{
        return this.items.length == 0;
    }

    public vider():void{
        this.items.splice(0,this.items.length);
    }
}