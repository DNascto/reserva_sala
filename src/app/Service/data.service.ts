import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from '../Component/Room';
import { Reservation } from '../Component/Reservation';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private sourceRoom = new BehaviorSubject(new Array<Room>());
  private sourceBooking = new BehaviorSubject(new Array<Reservation>());
  currentRooms = this.sourceRoom.asObservable();
  currentBookings = this.sourceBooking.asObservable();
  
  constructor() { }

  
  allRooms(val: Array<Room>) {
    this.sourceRoom.next(val);
  }

  freeRooms(val: Array<Room>) {
    this.sourceRoom.next(val);
  }

  allReservations(val2: Array<Reservation>) {
    this.sourceBooking.next(val2);
  }
}
