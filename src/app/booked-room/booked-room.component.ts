import { Room } from '../Component/Room';
import { Reservation } from '../Component/Reservation';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-booked-room',
  templateUrl: './booked-room.component.html',
  styleUrls: ['./booked-room.component.scss'],
})

export class BookedRoomComponent implements OnInit {


  reservation = [
    new Reservation(new Date(), new Room('Sala Grande', 50, true), 3, 'Bill Zuck'),
    new Reservation(new Date(), new Room('Sala Media', 25, true), 2, 'Steve Gates'),
    new Reservation(new Date(), new Room('Sala Pequena', 10, false), 5, 'Mark Jobs')
  ];

  constructor() { }

  ngOnInit() {}

}

console.log(new Date().toLocaleDateString());
