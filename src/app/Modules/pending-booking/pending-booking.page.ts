import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { ReservationService } from 'src/app/Service/Reservation.service';

@Component({
  selector: 'app-pending-booking',
  templateUrl: './pending-booking.page.html',
  styleUrls: ['./pending-booking.page.scss'],
})

export class PendingBookingPage implements OnInit {
  public items: any = [];
  user: User;
  noData;

  constructor(private bookingService: ReservationService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.bookingService.getBookingByApprovation(false).subscribe(b => {
      if (b.length <= 0) {
        this.noData = true;
      } else {
        b.forEach(i => {
          console.log(i.author + ' - ' + this.user.name);

          if (i.author == this.user.name) {
            this.items.push({ expanded: false, sala: i });
          }
        });
      }
    });
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  Approve() {

  }

  Disapprove() {

  }
}
