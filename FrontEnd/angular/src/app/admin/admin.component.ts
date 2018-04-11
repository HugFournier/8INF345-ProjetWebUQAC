import { Component } from '@angular/core';
import { Article } from "../models/Models";
import { Service } from "../service/Service";
import { AddArticle } from "../models/AddArticle";

@Component({
    selector : 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: [ './admin.component.css' ]
})

export class AdminComponent {
    private serveur: Service = new Service();
    private listeArticle: Array<Article> = this.serveur.returnArticlesStub();

    private model: AddArticle = {id: 0, nom: '', description: '', prix: 0};

    public getArticles() : Article[]{
        this.listeArticle = this.serveur.returnArticlesStub();
        return this.listeArticle;
    }

    public modifArticle(modifLabel: string, modifDescription: string, modifPrix: number){
        if(/^\s*$/.test(modifLabel) || /^\s*$/.test(modifDescription) || /^\s*$/.test(modifPrix.toString())){
            alert("Veuillez ne pas laisser de champs vides");
        }else{
            alert("Vous avez modifié l'article");
        }
    }

    public supprArticle(id: number){
        if(confirm("Êtes-vous sûr de vouloir supprimer cette article ?") == true){
            let article: Article = this.listeArticle.find(article => article.getID() === id);
            let index: number = this.listeArticle.indexOf(article);
            if(index > -1)
                this.listeArticle.splice(index, 1);
        }
    }

    public ajouterArticle(){
        if(!(/^\s*$/.test(this.model.id.toString()) || /^\s*$/.test(this.model.nom) || /^\s*$/.test(this.model.description) || /^\s*$/.test(this.model.prix.toString()))){
            let article: Article = new Article(this.model.id, this.model.nom, this.model.description, this.model.prix, "http://lorempixel.com/200/200/");
            this.listeArticle.push(article);
            this.clearForm();
        }else{
            alert("Veuillez renseigner tous les champs");
        }
    }

    private clearForm(){
        $('#newID').val('');
        $('#newNom').val('');
        $('#newDescription').val('');
        $('#newPrix').val('');
    }

}