import { Component } from '@angular/core';
import { Article, Panier, ArticlePanier, FabriquePanier } from "../models/Models";
import { Service } from "../service/Service";
import { LocalStorageWorker } from "../storage/StorageHelper";

@Component({
    selector : 'app-panier',
    templateUrl: './panier.component.html',
    styleUrls: [ './panier.component.css' ]
})

export class PanierComponent {

	private panier : Panier = new Panier();

	private a : Article;

	public setArticle(a : Article) : void {
		this.a = a;
	}

	public getArticle() : Article {
		return this.a;
	}

    public getArticlesPanier() : ArticlePanier[]{
        return this.getPanier().getArticlesPanier();
    }

    public getPanier() : Panier{
		let stockage : LocalStorageWorker = new LocalStorageWorker();
		let panierString : string = stockage.get("panier");
		let panier:Panier;

		if(panierString == null || panierString === ""){
			panier = new Panier();
			stockage.remove("panier");
			stockage.add("panier", JSON.stringify(panier));
		}
		else
		{
			panier = new FabriquePanier().factoryArticlePanierFromJSON(panierString);
		}
		return panier;
	}

	private randomisation(): string{
		let randomNumbers = "", randomLetters = "", possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		for(let i = 0; i < 10; i++)
			randomNumbers += (Math.floor(Math.random() * 9) + 1).toString();
		for (var i = 0; i < 5; i++)
			randomLetters += possible.charAt(Math.floor(Math.random() * possible.length));
		return "#" + randomLetters + ":" + randomNumbers;
	}

	public calculerTotal(): number{
		return this.getPanier().calculerTotal();
	}

	public addArticleParID(id:number){
		let stockage : LocalStorageWorker = new LocalStorageWorker();
		let panier:Panier = this.getPanier();
		stockage.remove("panier");
		panier.addItem(id);
		stockage.add('panier', JSON.stringify(panier));
	}

	public removeArticleParID(id:number){
		let stockage : LocalStorageWorker = new LocalStorageWorker();
		let panier:Panier = this.getPanier();
		stockage.remove("panier");
		panier.removeItem(id);
		stockage.add('panier', JSON.stringify(panier));
	}

	public viderPanier(){
		let stockage : LocalStorageWorker = new LocalStorageWorker();
		stockage.remove("panier");
		this.panier.vider();
	}

	public passerLaCommande(){
		if(Math.random() < 0.8){
			this.viderPanier();
			alert("Commande réalisée avec succès, votre numéro de commande est le " + this.randomisation() + ". Vous pouvez maitenant retourner à l'accueil");
		}else{
			alert("Une erreur s'est produite, la commande n'a pas pu être réalisée");
		}
	}

	public estPanierVide() : boolean {
		return this.getPanier().estVide();
	}
}