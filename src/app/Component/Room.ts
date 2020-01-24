export class Room {
    name: string;
    places: number;
    projector: boolean;
    booked: boolean;

    constructor(name: string, places: number, projector: boolean) {
        this.name = name;
        this.places = places;
        this.projector = projector;
    }
}
