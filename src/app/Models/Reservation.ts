import { Room } from './Room';

export class Reservation {
    date: string;
    room: Room;
    period: number;
    author: string;
    approved: boolean;
    checkout: Date;

    constructor(date: string, room: Room, period: number, author: string, approved: boolean) {
        this.date = date;
        this.room = room;
        this.period = period;
        this.author = author;
        this.approved = approved;
    }
}
