import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/Service/Reservation.service';

import { Reservation } from 'src/app/Models/Reservation';
import { User } from 'src/app/Models/User';

import addMinutes from 'date-fns/addMinutes';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})

export class ListPage implements OnInit {
  user: User;
  bookings: Reservation[];

  constructor(private bookingService: ReservationService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.bookingService.getAllBookingByAuthor(this.user.name).subscribe( b => {
      this.bookings = b;
      this.bookings.forEach(item => {        
        var res = addMinutes(new Date(item.date), item.period);
        item.checkout = new Date(res);
      });
    });
    console.log(this.bookings);
    
  }
}
