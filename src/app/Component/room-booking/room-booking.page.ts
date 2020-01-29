import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../Service/Reservation.service';
import { Reservation } from '../Reservation';
import { error } from 'util';

@Component({
  selector: 'app-room-booking',
  templateUrl: './room-booking.page.html',
  styleUrls: ['./room-booking.page.scss'],
})
export class RoomBookingPage implements OnInit {
  today;
  nextThirty;
  selectedDate;
  selectedTime;
  
  constructor(private reservationService: ReservationService) { 
    this.today = new Date().toISOString();
    this.selectedDate = new Date().toLocaleDateString();
    let now = new Date();
    now.setDate(now.getFullYear() + 30); // 30 months
    this.nextThirty = now.toISOString();
  }

  ngOnInit() {
  }

  onSelectDate(e: Event){
    console.log(e);
  }

  onSelectTime(){

  }
  sendBooking(booking: Reservation){
    this.reservationService.postReservation(booking).subscribe( r => {
      console.log('Deu bom. ' + r);
    },
    error => {
      console.log('Deu ruim no retorno da gravação da nova reserva.');
    });
  }
}
