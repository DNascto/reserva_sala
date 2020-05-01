import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from 'src/app/Service/alert.service';
import { DataService } from 'src/app/Service/data.service';
import { BookingService } from '../../Service/Booking.service';

import { Booking } from '../../Models/Booking';
import { Room } from '../../Models/Room';
import { User } from 'src/app/Models/User';

import diffInMinutes from 'date-fns/differenceInMinutes';
import { ValidationsService } from 'src/app/Service/validations.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-room-booking',
  templateUrl: './room-booking.page.html',
  styleUrls: ['./room-booking.page.scss'],
})
export class RoomBookingPage implements OnInit {
  maxDate;
  today;
  selectedDate;
  selectedInicialTime;
  selectedFinalTime;
  selectedRoom: Room;
  toggleFinalTime: boolean;

  limitHour = 20;
  customHours = [];
  bookingList: Booking[];
  user: User;

  constructor(
    private reservationService: BookingService,
    private dataService: DataService,
    private alertService: AlertService,
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private validationService: ValidationsService,
    private route: Router
  ) { }

  ngOnInit() {
    this.user = this.authService.jwtPayload;
    this.dataService.varSelectedRoom.subscribe(r => {
      this.selectedRoom = r;
    });

    this.dataService.varCurrentBookings.subscribe(r => {
      this.bookingList = r;
    });
    this.setHours();

    if (new Date().getHours() < this.limitHour) {
      this.today = new Date().toISOString();
      this.selectedDate = new Date().toISOString();
    } else {
      const nextDay = new Date();
      this.today = nextDay.toISOString();
      nextDay.setDate(nextDay.getDate() + 1);
      this.selectedDate = nextDay.toISOString();
    }

    const now = new Date();
    now.setFullYear(now.getFullYear() + 5); // 5 days
    this.maxDate = now.toISOString();

    this.toggleFinalTime = false;
  }
  // ngOnDestroy() {
  // }

  onSelectDate() {
  }

  onSelectInitialTime() {
    const now = new Date(this.selectedInicialTime);
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

    const period = diffInMinutes(new Date(this.selectedFinalTime), new Date(this.selectedInicialTime));

    if (period <= 0) {
      this.alertService.presentToast('A hora de termino deve ser posterior a hora de inicio.');
      return;
    }

    const booking = new Booking(
      this.selectedInicialTime,
      this.selectedRoom,
      period,
      this.user.name,
      this.user.immediatlyApprovation);

    this.reservationService.postReservation(booking).subscribe(
      () => {
        this.alertService.presentToast('Solicitação de reserva realizada com sucesso');

        this.route.navigateByUrl('/home').then(() => {
          location.reload();
        });
      },
      error => {
        this.errorHandler.handle(error);
        this.alertService.presentToast('Erro ao gravar reserva. Tente novamente mais tarde.');
      });
  }

  myCompareDate(i: Booking): boolean {
    // tslint:disable-next-line: triple-equals
    return new Date(i.date).getDate() == new Date(this.selectedInicialTime).getDate();
  }

  setHours() {
    if (this.bookingList.length > 0) {
      for (let i = 6; i <= this.limitHour; i++) {
        let insert = false;
        this.bookingList.forEach(element => {
          if (i < new Date(element.date).getHours() ||
            i > (new Date(element.date).getHours() + (element.period / 60))) {
            insert = true;
          } else {
            insert = false;
            return;
          }
        });
        if (insert) {
          this.customHours.push(i);
        }
      }
    } else {
      this.customHours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    }
  }
}
