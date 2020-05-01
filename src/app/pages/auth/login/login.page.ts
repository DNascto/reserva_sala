import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
import { AlertService } from 'src/app/Service/alert.service';
import { AuthService } from 'src/app/Service/auth.service';
import { ValidationsService } from 'src/app/Service/validations.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  hidePwd = true;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private validation: ValidationsService,
    private navCtrl: NavController,
    private menu: MenuController,
    private route: Router,
    private errorHandler: ErrorHandlerService,
    public router: ActivatedRoute
  ) {
    this.menu.enable(false);
  }

  ngOnInit() {
  }

  login(form: NgForm) {
    if (!this.validation.loginValidation(form)) {
      return;
    }

    this.authService.login(form.value.cpf, btoa(form.value.password))
      .then(
        () => {
          if (this.authService.isLogged()) {
            this.navCtrl.navigateRoot('/');
          }
        }
      ).catch(
        error => {
          this.errorHandler.handle(error);
        }
      );
  }

  cadEmpr() {
    this.route.navigateByUrl('register');
  }
}
