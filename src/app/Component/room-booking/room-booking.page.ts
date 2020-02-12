import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from 'src/app/Service/data.service';
import { ReservationService } from '../../Service/Reservation.service';

import { Reservation } from '../../Models/Reservation';
import { Room } from '../../Models/Room';

import { ToastController } from '@ionic/angular';
import diffInMinutes from 'date-fns/differenceInMinutes';
import { AlertService } from 'src/app/Service/alert.service';

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

  customHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  bookingList: Reservation[];

  constructor(
    private reservationService: ReservationService,
    private dataService: DataService,
    private route: Router,
    private alertService: AlertService
  ) {
    this.today = new Date().toISOString();
    this.selectedDate = new Date().toISOString();

    let now = new Date();
    now.setFullYear(now.getFullYear() + 5); // 5 days
    this.maxDate = now.toISOString();

    this.toggleFinalTime = false;
  }

  ngOnInit() {
    this.dataService.varSelectedRoom.subscribe(r => {
      this.selectedRoom = r;
    })

    this.dataService.varCurrentBookings.subscribe(r => {
      this.bookingList = r;
    })
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
    if (!this.bookingValidation()) {
      return;
    }

    let period = diffInMinutes(new Date(this.selectedFinalTime), new Date(this.selectedInicialTime));

    if (period <= 0) {
      this.alertService.presentToast('A hora de termino deve ser posterior a hora de inicio.');
      return;
    }
    //TODO: remover fakeUser apos criar usuarios
    let user = {
      immediatlyApprovation: true
    }

    //TODO: trocar o 'author' para o nome do usuario
    let booking = new Reservation(
      this.selectedInicialTime,
      this.selectedRoom,
      period,
      'Daniel',
      user.immediatlyApprovation);
    console.log(booking.date);

    this.reservationService.postReservation(booking)
      .subscribe(r => {
        this.alertService.presentToast('Solicitação de reserva realizada com sucesso');
        console.log('data To DB: ' + this.selectedInicialTime);
        console.log(new Date(booking.date).toUTCString() + ' booking');

        // this.route.navigateByUrl('/home').then(()=>{
        //   location.reload();
        // });
      },
        error => {
          console.log('Deu ruim no retorno da gravação da nova reserva.');
          console.log(error);
          this.alertService.presentToast('Erro ao gravar reserva. Tente novamente mais tarde.');
        });
  }

  myCompareDate(i: Reservation) {
    return new Date(i.date).getDate() == new Date(this.selectedInicialTime).getDate();
  }

  bookingValidation(): boolean {
    // if (!new Date(this.selectedDate).getDate()) {
    if (!this.selectedDate) {
      this.alertService.presentToast('Selecione uma data.');
      return false;
    }

    if (!this.selectedInicialTime) {
      this.alertService.presentToast('Selecione o hora de inicio.');
      return false;
    }

    if (!this.selectedFinalTime) {
      this.alertService.presentToast('Selecione o hora de termino.');
      return false;
    }

    if (new Date(this.selectedDate).toLocaleDateString() == new Date().toLocaleDateString()) {
      if (new Date(this.selectedInicialTime).getHours() < new Date().getHours()) {
        this.alertService.presentToast('Selecione uma hora posterior a atual.');
        return false;
      }
    }
    return true;
  }
}
