import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from '../Models/Room';
import { Booking } from '../Models/Booking';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  room: Room;

  private sourceRoom = new BehaviorSubject(this.room);
  private sourceRooms = new BehaviorSubject(new Array<Room>());
  private sourceBooking = new BehaviorSubject(new Array<Booking>());
  varSelectedRoom = this.sourceRoom.asObservable();
  varCurrentRooms = this.sourceRooms.asObservable();
  varCurrentBookings = this.sourceBooking.asObservable();

  constructor() { }

  selectedRoom(val: Room) {
    this.sourceRoom.next(val);
  }

  allRooms(val: Array<Room>) {
    this.sourceRooms.next(val);
  }

  freeRooms(val: Array<Room>) {
    this.sourceRooms.next(val);
  }

  allReservations(val2: Array<Booking>) {
    this.sourceBooking.next(val2);
  }
}
