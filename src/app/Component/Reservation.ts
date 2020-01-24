import { Room } from './Room';

export class Reservation {
    date: Date;
    room: Room;
    period: number;
    author: string;

    constructor(date: Date, room: Room, period: number, author: string) {
        this.date = date;
        this.room = room;
        this.period = period;
        this.author = author;
    }
}
