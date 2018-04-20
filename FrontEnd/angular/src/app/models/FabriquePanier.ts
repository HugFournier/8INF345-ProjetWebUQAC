/*import { ArticlePanier } from "./ArticlePanier";
import { Panier } from "./Panier";

export class FabriquePanier{
    
    constructor(){

    }

    factoryArticlePanierFromJSON(JSONString: string): Panier {
        let panier : Panier = new Panier();
        JSONString = JSON.parse(JSONString);
        JSONString["items"].forEach(articlePanierJSON => {
            panier.addItem(articlePanierJSON["id"],articlePanierJSON["quantite"]);
        });
        return panier;
    }
}*/