import { Component } from '@angular/core';
import { Article } from "../models/Models";
import { Service } from "../service/Service";
import {ActivatedRoute} from "@angular/router";
import {PanierComponent} from "../panier/panier.component";

@Component({
    selector : 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: [ './detail.component.css' ]
})

export class DetailComponent {

    private serveur : Service = new Service();
    private idArticle : number = 0;

    constructor(private route: ActivatedRoute){
        this.route.params.subscribe(params => {
            this.idArticle = +params["id"];
        });
    }

	public ajouterArticlePanierParID(id:number){
        let controleurPanier : PanierComponent = new PanierComponent();
        controleurPanier.addArticleParID(id);
    }

    public getArticles() : Article[]{
        return [this.serveur.getArticleParID(this.idArticle)];
    }
}