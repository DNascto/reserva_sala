export class Room {
    id: number;
    name: string;
    places: number;
    projector: boolean;
    booked: boolean;

    constructor(name: string, places: number, projector: boolean, id?: number) {
        this.name = name;
        this.places = places;
        this.projector = projector;
        this.id = id;
    }
}
