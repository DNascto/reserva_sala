import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, ModalController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { AlertService } from 'src/app/Service/alert.service';
import { AuthService } from 'src/app/Service/auth.service';
import { Router } from '@angular/router';
import { ValidationsService } from 'src/app/Service/validations.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private validation: ValidationsService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }

  // On Register button tap, dismiss login modal and open register modal
  async registerModal() {
    this.dismissLogin();
    this.route.navigateByUrl('/register').then(() => {
      location.reload();
    });
    // const registerModal = await this.modalController.create({
    //   component: RegisterPage
    // });
    // return await registerModal.present();
  }

  login(form: NgForm) {
    if (!this.validation.loginValidation(form)) {
      return;
    }

    this.authService.login(form.value.cpf, form.value.password).subscribe(
      data => {
        // localStorage.setItem('token', JSON.stringify(data.token));
        if (!data || data == null) {
          this.alertService.presentToast('Usuario e/ou senha está incorreto');
        } else {
          this.navCtrl.navigateRoot('/home');
        }
      },
      error => {
        if (error.status == 401) {
          this.alertService.presentToast('Perfil não encontrado. Usuario e/ou senha incorreto.');
        }
      }
    );
  }
}
