import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from './alert.service';
import { RoomBookingPage } from '../Component/room-booking/room-booking.page';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor(private alert: AlertService) { }

  loginValidation(form: NgForm): boolean {
    if (!form.value.cpf) {
      this.alert.presentToast('Informe um CPF ou apelido.');
      return false;
    }

    if (!form.value.password) {
      this.alert.presentToast('Informe a senha.');
      return false;
    }
    return true;
  }

  bookingValidation(room: RoomBookingPage): boolean {
    if (!room.selectedDate) {
      this.alert.presentToast('Selecione uma data.');
      return false;
    }

    if (!room.selectedInicialTime) {
      this.alert.presentToast('Selecione o hora de inicio.');
      return false;
    }

    if (!room.selectedFinalTime) {
      this.alert.presentToast('Selecione o hora de termino.');
      return false;
    }

    if (new Date(room.selectedDate).toLocaleDateString() == new Date().toLocaleDateString()) {
      if (new Date(room.selectedInicialTime).getHours() < new Date().getHours()) {
        this.alert.presentToast('Selecione uma hora posterior a atual.');
        return false;
      }
    }
    return true;
  }
}
