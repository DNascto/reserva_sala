import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/Service/data.service';
import { RoomService } from 'src/app/Service/Room.service';
import { UserService } from 'src/app/Service/User.service';
import { ReservationService } from 'src/app/Service/Reservation.service';
import { ToastController, NavController } from '@ionic/angular';
import { User } from 'src/app/Models/User';
import { AlertService } from 'src/app/Service/alert.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  notReserved: number;
  reserved: number;

  user: User;

  controller = document.querySelector('div > ion-toast-controller');

  constructor(
    private roomsService: RoomService,
    private bookingService: ReservationService,
    private userService: UserService,
    private dataService: DataService,
    private alertService: AlertService,
    private authService: AuthService, 
    private navCtrl: NavController
  ) { }
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    pager: true,
    speed: 400,
    initialSlide: 1
  };

  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        if(this.authService.isLoggedIn) {
          this.user = user;
        } else {
          this.navCtrl.navigateRoot('/login');
        }
      }
    );
  }

  ngOnInit(): void {
    this.reserved = 0;
    this.notReserved = 0;

    this.roomsService.getCountRoom(false).subscribe(r => {
      this.notReserved = r;
    }, err => {
      console.log(err);
    });

    this.roomsService.getCountRoom(true).subscribe(r => {
      this.reserved = r;
    }, err => {
      console.log(err);
    });

    this.roomsService.getAllFreeRoom().subscribe(r => {    
      this.dataService.freeRooms(r);
      // localStorage.setItem('freeRooms', JSON.stringify(r));
    }, err => {
      console.log(err);
    });

    this.bookingService.getAllReservation().subscribe(b => {
      if (b.length === 0) {
        this.alertService.presentFixedToast('Nenhum dado registrado');
      } else {
        this.dataService.allReservations(b);
      }
    }, err => {
      console.log(err);
      if (err.status === 0) {
        this.alertService.presentFixedToast('Servidor em manutenção. Tente novamente mais tarde.');
      } else if (err.status === 500) {
        this.alertService.presentFixedToast('Erro de requisição. Tente novamente mais tarde.');
      }
    });
  }
}
