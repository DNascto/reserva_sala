import { Room } from './Room';

export class Booking {
    id: string;
    date: string;
    room: Room;
    period: number;
    author: string;
    approved: boolean;
    checkout: Date;

    constructor(date: string, room: Room, period: number, author: string, approved: boolean, id?: string) {
        this.date = date;
        this.room = room;
        this.period = period;
        this.author = author;
        this.approved = approved;
        this.id = id;
    }
}
