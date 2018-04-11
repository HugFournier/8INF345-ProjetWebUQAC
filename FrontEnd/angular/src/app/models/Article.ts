export class Article{

    private image : URL;

    public constructor(private ID : number, private label : string, private description : string, private prix : number, image : String){
        this.image = new URL(image as string);
    };

    public getID() : number {
        return this.ID;
    }

    public getLabel() : string {
        return this.label;
    }

    public getDescription() : string {
        return this.description;
    }

    public getPrix() : number {
        return this.prix;
    }

    public getImage() : URL {
        return this.image;
    }

    public toString() : String {
        return this.getLabel() + "\t" + this.getDescription();
    }
}