import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
import { AlertService } from 'src/app/Service/alert.service';
import { AuthService } from 'src/app/Service/auth.service';
import { ValidationsService } from 'src/app/Service/validations.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private validation: ValidationsService,
    private navCtrl: NavController,
    private menu: MenuController,
    private route: Router
  ) { 
    this.menu.enable(false); 
  }

  ngOnInit() {
  }

  // On Register button tap, dismiss login modal and open register modal
  async registerModal() {
    this.route.navigateByUrl('/register').then(() => {
      location.reload();
    });
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
