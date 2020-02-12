import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/Service/alert.service';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/Service/auth.service';
import { NgForm } from '@angular/forms';
import { LoginPage } from '../login/login.page';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Service/User.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private modalController: ModalController,
    private authService: AuthService,
    private userService: UserService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  // Dismiss Register Modal
  dismissRegister() {
    this.modalController.dismiss();
  }

  // // On Login button tap, dismiss Register modal and open login Modal
  async loginModal() {
    this.dismissRegister();
    this.route.navigateByUrl('/login').then(() => {
      location.reload();
    });
    // const loginModal = await this.modalController.create({
    //   component: LoginPage,
    // });
    // return await loginModal.present();
  }

  register(form: NgForm) {
    let user = new User(form.value.name,
      form.value.password,
      form.value.accessLevel,
      form.value.immediatlyApprovation,
      form.value.cpf,
      form.value.nickname
    );

    this.userService.postNewUser(user).subscribe(
      data => {
        // this.authService.login(form.value.cpf, form.value.nickname, form.value.password).subscribe(
        //   data => {
        //   },
        //   error => {
        //     console.log(error);
        //   },
        //   () => {
        //     this.dismissRegister();
        //   }
        // );
        this.alertService.presentToast('Cadastro realizado com sucesso. ' + data['message']);
      },
      error => {
        console.log(error);
      },
      () => { }
    );
  }
}
