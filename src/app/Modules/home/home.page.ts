import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/Service/Room.service';
import { Room } from 'src/app/Component/Room';
import { DataService } from 'src/app/Service/data.service';
import { ReservationService } from 'src/app/Service/Reservation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  rooms: Room[];
  notReserved: number;
  reserved: number;

  constructor(
    private roomsService: RoomService,
    private bookingService: ReservationService,
    private dataService: DataService
    ) { }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  ngOnInit(): void {
    this.reserved = 0;
    this.notReserved = 0;

    this.roomsService.getAllRoom().subscribe(r => {
      this.dataService.changeRooms(r);
    }, err => {
      console.log(err);
    });    

    // this.roomsService.getAllFreeRoom().subscribe(r => {
    //   this.dataService.freeRooms(r);
    // }, err => {
    //   console.log(err);
    // });
    
    this.bookingService.getAllReservation().subscribe(b => {
      this.dataService.changeReservations(b);
    }, err => {
      console.log(err);
    });
  }
}
