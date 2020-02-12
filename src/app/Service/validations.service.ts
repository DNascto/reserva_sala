import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor(private alert: AlertService) { }

  loginValidation(form: NgForm): boolean{
    if(!form.value.cpf && !form.value.nickname){
      this.alert.presentToast('Informe um CPF ou apelido.');
      return false;
    }
    
    if(!form.value.password){
      this.alert.presentToast('Informe a senha.');
      return false;
    }
    return true;

  }
}
