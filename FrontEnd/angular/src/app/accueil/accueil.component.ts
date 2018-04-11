import { Component } from '@angular/core';
import { Article } from "../models/Models";
import { Service } from "../service/Service";
import {Router, ActivatedRoute} from "@angular/router";
import {PanierComponent} from "../panier/panier.component";

@Component({
    selector : 'app-accueil',
    templateUrl: './accueil.component.html',
    styleUrls: [ './accueil.component.css' ]
})

export class AccueilComponent {
    private serveur : Service = new Service();
    private numeroDePage : number = 0;
    private listeLienPagination : number[] = new Array(this.serveur.getNombreDePage()).fill(0);

    constructor(private router: Router, private route: ActivatedRoute){
        let nbDePage : number = this.serveur.getNombreDePage();
        this.route.params.subscribe(params => {
            this.numeroDePage = +params["numeroDePage"];
        });
        if(Number.isNaN(this.numeroDePage)) this.numeroDePage = 0;
    }

	public ajouterArticlePanierParID(id:number){
        let controleurPanier : PanierComponent = new PanierComponent();
        controleurPanier.addArticleParID(id);
    }

    public getArticles() : Article[]{
        return this.serveur.returnPageArticlesStub(this.numeroDePage);
    }
    
    reroute(newRoute: string) : void {
        this.router.navigateByUrl('/'+newRoute, { skipLocationChange: false });
    }
}