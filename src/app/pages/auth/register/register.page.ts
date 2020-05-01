import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/Service/alert.service';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/Service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Service/User.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  cpfLabel;
  logado: boolean;

  userForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertService: AlertService,
    private menu: MenuController,
    private route: Router,
    private errorHandler: ErrorHandlerService
  ) {
    this.menu.enable(false);
  }

  ngOnInit() {
    this.logado = this.authService.isLogged();
    this.cpfLabel = this.authService.isLogged() ? 'CPF' : 'CNPJ';

    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordCheck: new FormControl('', Validators.required),
      nickname: new FormControl('', Validators.required),
      accessLevel: new FormControl('', Validators.required),
      immediatlyApprovation: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      cnpj: new FormControl('')
    });
  }

  register() {
    const user = new User().createUser(
      this.userForm.controls.name.value,
      btoa(this.userForm.controls.password.value), // encriptador. Usar 'atob' para descriptar
      this.userForm.controls.accessLevel.value ? this.userForm.controls.accessLevel.value : 4,
      this.userForm.controls.immediatlyApprovation.value ? this.userForm.controls.immediatlyApprovation.value : false,
      this.userForm.controls.company.value ? this.userForm.controls.company.value : this.authService.jwtPayload.company,
      this.userForm.controls.cpf.value,
      this.userForm.controls.nickname.value
    );

    if (this.authService.isLogged()) {
      this.userService.postNewUser(user).subscribe(
        () => {
          this.alertService.presentToast('Cadastro realizado com sucesso.');
        },
        error => {
          this.errorHandler.handle(error);
        }
      );
    } else {
      user.accessLevel = 1;
      this.userService.postNewCompany(user).subscribe(
        () => {
          this.route.navigateByUrl('/login');
        }, error => {
          this.errorHandler.handle(error);
          this.alertService.presentToast('Erro ao cadastrar empresa. ' + error.message);
        }
      );
    }
  }
}
