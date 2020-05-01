export class Room {
    id: string;
    name: string;
    company: string;
    places: number;
    projector: boolean;
    // computer: boolean;
    booked: boolean;
    additional: string;
    description: string;

    create(
        name: string, company: string, places: number, projector: boolean,
        additional?: string, description?: string, booked?: boolean, id?: string) {
        const room = new Room();
        room.name = name;
        room.company = company;
        room.places = places;
        room.projector = projector;
        room.additional = additional;
        room.description = description;
        room.booked = booked;
        room.id = id;
        return room;
    }
}
