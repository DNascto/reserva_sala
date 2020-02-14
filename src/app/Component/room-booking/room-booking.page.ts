import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from 'src/app/Service/alert.service';
import { DataService } from 'src/app/Service/data.service';
import { ReservationService } from '../../Service/Reservation.service';

import { Reservation } from '../../Models/Reservation';
import { Room } from '../../Models/Room';
import { User } from 'src/app/Models/User';

import diffInMinutes from 'date-fns/differenceInMinutes';
import { ValidationsService } from 'src/app/Service/validations.service';

@Component({
  selector: 'app-room-booking',
  templateUrl: './room-booking.page.html',
  styleUrls: ['./room-booking.page.scss'],
})
export class RoomBookingPage implements OnInit {
  periodStarts;
  periodEnds;
  minPeriod;
  maxDate;
  today;
  selectedDate;
  selectedInicialTime;
  selectedFinalTime;
  selectedRoom: Room;
  toggleFinalTime: boolean;

  customHours = [];//[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  bookingList: Reservation[];
  user: User;
  disabledHours: [11, 12, 13];

  constructor(
    private reservationService: ReservationService,
    private dataService: DataService,
    private route: Router,
    private alertService: AlertService,
    private validationService: ValidationsService
  ) {
    this.today = new Date().toISOString();
    this.selectedDate = new Date().toISOString();

    let now = new Date();
    now.setFullYear(now.getFullYear() + 5); // 5 days
    this.maxDate = now.toISOString();

    this.toggleFinalTime = false;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.dataService.varSelectedRoom.subscribe(r => {
      this.selectedRoom = r;
    })

    this.dataService.varCurrentBookings.subscribe(r => {
      this.bookingList = r;
    })
    this.setHours();
  }
  // ngOnDestroy() {
  // }

  onSelectDate() {
  }

  onSelectInitialTime() {
    let now = new Date(this.selectedInicialTime);
    now.setHours(now.getHours() + 1);
    now.setMinutes(null);
    now.setSeconds(null);
    this.selectedFinalTime = now.toISOString();
  }

  // onSelectFinalTime() {
  //   this.selectedFinalTime.setDate(this.selectedDate.getDate());
  // }

  sendBooking() {
    if (!this.validationService.bookingValidation(this)) {
      return;
    }

    let period = diffInMinutes(new Date(this.selectedFinalTime), new Date(this.selectedInicialTime));

    if (period <= 0) {
      this.alertService.presentToast('A hora de termino deve ser posterior a hora de inicio.');
      return;
    }

    let booking = new Reservation(
      this.selectedInicialTime,
      this.selectedRoom,
      period,
      this.user.name,
      this.user.immediatlyApprovation);

    this.reservationService.postReservation(booking)
      .subscribe(r => {
        this.alertService.presentToast('Solicitação de reserva realizada com sucesso');

        this.route.navigateByUrl('/home').then(() => {
          location.reload();
        });
      },
        error => {
          console.log('Deu ruim no retorno da gravação da nova reserva.');
          console.log(error);
          this.alertService.presentToast('Erro ao gravar reserva. Tente novamente mais tarde.');
        });
  }

  myCompareDate(i: Reservation): boolean {
    return new Date(i.date).getDate() == new Date(this.selectedInicialTime).getDate();
  }

  setHours() {
    for (let i = 6; i < 20; i++) {
      let insert = false;
      // this.bookingList.forEach(element => {
      for (let j = 0; j < this.bookingList.length; j++) {

        if (i < new Date(this.bookingList[j].date).getHours() ||
          i > (new Date(this.bookingList[j].date).getHours() + (this.bookingList[j].period / 60))) {
            insert = true;
        } else {
          insert = false;
          break;
        }
      }
      // });
      if (insert) {
        console.log('inseriu '+i);
        
        this.customHours.push(i);
      }
    }
  }
}
