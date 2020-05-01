import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/Service/Booking.service';

import { Booking } from 'src/app/Models/Booking';
import { User } from 'src/app/Models/User';

import addMinutes from 'date-fns/addMinutes';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})

export class ListPage implements OnInit {
  user: User;
  bookings: Booking[];

  constructor(private bookingService: BookingService, private authService: AuthService) { }

  ngOnInit() {
    const name = this.authService.jwtPayload.name;

    this.bookingService.getAllBookingByAuthor(name).subscribe(b => {
      this.bookings = b;
      this.bookings.forEach(item => {
        const res = addMinutes(new Date(item.date), item.period);
        item.checkout = new Date(res);
      });
    });
    console.log(this.bookings);
  }
}
