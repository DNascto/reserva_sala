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
      access: '14'
    },
    {
      title: 'Minhas Reservas',
      url: '/list',
      icon: 'list',
      access: '14'
    },
    {
      title: 'Reservas Pendentes',
      url: '/pending-booking',
      icon: 'time',
      access: '1'
    },
    {
      title: 'Configurações',
      url: '/configs',
      icon: 'settings',
      access: '14'
    }
  ];

  user: User;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
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
      //this.splashScreen.hide();
      // this.authService.getToken();
    });
  }

  // When Logout Button is pressed 
  logout() {
    this.authService.logout();
    // this.authService.logout().subscribe(
    //   data => {
    //     this.alertService.presentToast(data['message']);        
    //   },
    //   error => {
    //     console.log(error);
    //   },
    //   () => {
    this.navCtrl.navigateRoot('/login');
    //   }
    // );
  }

  userAccessLevel(num: string): boolean {
    this.user = JSON.parse(localStorage.getItem('user'));
    var al = this.user.accessLevel.toString();
    
    return num.toString().includes(this.user.accessLevel.toString());
  }
}
