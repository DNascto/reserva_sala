import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './Service/auth.service';
import { AlertService } from './Service/alert.service';
import { User } from './Models/User';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      accessLevel: '1234'
    },
    {
      title: 'Minhas Reservas',
      url: '/list',
      icon: 'list',
      accessLevel: '1234'
    },
    {
      title: 'Reservas Pendentes',
      url: '/pending-booking',
      icon: 'time',
      accessLevel: '1'
    },
    {
      title: 'Gerenciar Participantes/Usuarios',
      url: '/manage-room',
      icon: 'apps',
      accessLevel: '1'
    },
    {
      title: 'Gerenciar Salas',
      url: '/manage-room',
      icon: 'apps',
      accessLevel: '1'
    },
    {
      title: 'Configurações',
      url: '/configs',
      icon: 'settings',
      accessLevel: '1234'
    }
  ];

  user: User;

  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // Commenting splashScreen Hide, so it won't hide splashScreen before auth check
      // this.splashScreen.hide();
      // this.authService.getToken();
    });
  }

  // When Logout Button is pressed
  logout() {
    this.authService.logout()
      .then(
        () => {
          this.alertService.presentToast('Saindo');
        })
      .catch(
        () => {
          console.log('Erro ao fazer loggoout');
        }
      )
      .finally(
        () => {
          this.navCtrl.navigateRoot('/login');
        }
      );
  }

  userAccessLevel(num: string): boolean {
    if (this.authService.isLogged()) {
      const accessLevel = this.authService.jwtPayload.accessLevel;
      return num.toString().includes(accessLevel);
    } else {
      // this.user = new User().createUser('', '', 4, false, null);
      return num.toString().includes('4');
    }

    // return num.toString().includes(this.user.accessLevel.toString());
  }
}
