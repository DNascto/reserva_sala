import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { ReservationService } from 'src/app/Service/Reservation.service';
import { Reservation } from 'src/app/Models/Reservation';
import addMinutes from 'date-fns/addMinutes';

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
          if (!i.approved) {
            var res = addMinutes(new Date(i.date), i.period);
            i.checkout = new Date(res);
            this.items.push({ expanded: false, booking: i });
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

  Approvation(approved: boolean, booking: Reservation) {
    if (approved) {
      booking.approved = true;
      this.bookingService.putByApprovation(booking).subscribe(b => {
        console.log('Reserva atualizada');

      });
    } else {
      this.bookingService.deleteBooking(booking).subscribe(b => {
        /** TODO: enviar notificação para o usuario, informando a reccusa da reserva.*/
        console.log('Reserva excluida');

      });
    }
  }
}
