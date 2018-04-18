import {Etape} from '../models/Etape';
import {Voyage} from '../models/Voyage'; 

export class serviceMaps{

    private static listeEtape1: Etape[] = [
        new Etape(1, "Ottawa", new google.maps.LatLng(46.7575555, -72.1884406), 'DRIVING', '17/04/2018', true, 2, null),
        new Etape(2, "Montreal", new google.maps.LatLng(46.7575555, -72.1884406), 'DRIVING', '20/04/2018', false, 3, null),
        new Etape(3, "Chicoutimi", new google.maps.LatLng(46.7575555, -72.1884406), 'DRIVING', '25/04/2018', false, null, null),
    ];

    private static listeEtape2: Etape[] = [
        new Etape(1, "Ottawa", new google.maps.LatLng(46.7575555, -72.1884406), 'DRIVING', '17/04/2018', true, 2, null),
        new Etape(2, "Montreal", new google.maps.LatLng(46.7575555, -72.1884406), 'DRIVING', '20/04/2018', false, 3, null),
        new Etape(3, "Chicoutimi", new google.maps.LatLng(46.7575555, -72.1884406), 'DRIVING', '25/04/2018', false, 4, null),
        new Etape(4, "Alma", new google.maps.LatLng(46.7575555, -72.1884406), 'DRIVING', '20/04/2018', false, 5, null),
        new Etape(5, "New York", new google.maps.LatLng(46.7575555, -72.1884406), 'DRIVING', '25/04/2018', false, null, null),
    ];

    private static listeVoyageStub: Voyage[] = [
        new Voyage(1, "Voyage 1", serviceMaps.listeEtape1),
        new Voyage(2, "Voyage 2", serviceMaps.listeEtape2),
        new Voyage(3, "Voyage 3", serviceMaps.listeEtape1),
    ];

    public returnVoyageStub(): Array<Voyage> {
        return serviceMaps.listeVoyageStub;
    }

    public getVoyageById(id: number){
        return serviceMaps.listeVoyageStub.find(e => e.id == id);
    }

}