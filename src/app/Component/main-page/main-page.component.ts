import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Service/data.service';
import { Room } from '../Room';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 2,
    speed: 400,
    pager: true
  };

  notReserved: number;
  reserved: number;
  rooms: Room[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.notReserved = 0;
    this.reserved = 0;
    this.dataService.currentRooms.subscribe(data => {
      console.log(data);
      
      this.rooms = data;
      this.countBookings();
    });
  }

  countBookings() {
    this.rooms.forEach(i => {
      if (i.booked) {
        this.reserved++;
      } else {
        this.notReserved++;
      }
    });
  }
}