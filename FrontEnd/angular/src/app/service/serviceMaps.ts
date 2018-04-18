import {Etape} from '../models/Etape';
import {Voyage} from '../models/Voyage'; 
import { PointDinteret } from '../models/PointDinteret';

export class ServiceMaps{

    private static listePointInteret: PointDinteret[] = [
        new PointDinteret(1, "Point 1", new google.maps.LatLng(46.7575555, -60.1884406), "description1"),
        new PointDinteret(2, "Point 2", new google.maps.LatLng(43.7575555, -53.1884406), "description2")
    ];

    private static listeEtape1: Etape[] = [
        new Etape(1, "Ottawa", new google.maps.LatLng(45.4215296, -75.69719309999999), 'DRIVING', '17/04/2018', true, 2, ServiceMaps.listePointInteret),
        new Etape(2, "Montreal", new google.maps.LatLng(45.5016889, -73.56725599999999), 'DRIVING', '20/04/2018', false, 3, null),
        new Etape(3, "Chicoutimi", new google.maps.LatLng(48.3516735, -71.13851360000001), 'DRIVING', '25/04/2018', false, null, ServiceMaps.listePointInteret),
    ];

    private static listeEtape2: Etape[] = [
        new Etape(4, "Paris", new google.maps.LatLng(48.856614, 2.3522219000000177), 'DRIVING', '17/04/2018', true, 2, ServiceMaps.listePointInteret),
        new Etape(5, "Clermont-Ferrand", new google.maps.LatLng(45.77722199999999, 3.0870250000000397), 'DRIVING', '20/04/2018', false, 3, null),
        new Etape(6, "Lyon", new google.maps.LatLng(45.764043, 4.835658999999964), 'DRIVING', '25/04/2018', false, 4, null),
        new Etape(7, "Grenoble", new google.maps.LatLng(45.188529, 5.724523999999974), 'DRIVING', '30/04/2018', false, 5, ServiceMaps.listePointInteret),
        new Etape(8, "Nice", new google.maps.LatLng(43.7101728, 7.261953199999994), 'DRIVING', '03/05/2018', false, null, ServiceMaps.listePointInteret),
    ];

    private static listeVoyageStub: Voyage[] = [
        new Voyage(1, "Voyage 1", ServiceMaps.listeEtape1),
        new Voyage(2, "Voyage 2", ServiceMaps.listeEtape2),
        new Voyage(3, "Voyage 3", ServiceMaps.listeEtape1),
    ];

    public returnVoyageStub(): Array<Voyage> {
        return ServiceMaps.listeVoyageStub;
    }

    public getVoyageById(id: number){
        return ServiceMaps.listeVoyageStub.find(e => e.id == id);
    }

    public getEtapeById(id: number){
        // if(ServiceMaps.listeEtape1.find(e => e.id == id) != null){
            return ServiceMaps.listeEtape1.find(e => e.id == id);
        // } else {
        //     return ServiceMaps.listeEtape2.find(e => e.id == id)
        // }
    }

}