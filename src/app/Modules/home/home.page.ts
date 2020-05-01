import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { AlertService } from 'src/app/Service/alert.service';
import { DataService } from 'src/app/Service/data.service';
import { RoomService } from 'src/app/Service/Room.service';
import { BookingService } from 'src/app/Service/Booking.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  notReserved: number;
  reserved: number;

  constructor(
    private bookingService: BookingService,
    private roomsService: RoomService,
    private dataService: DataService,
    private authService: AuthService,
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService,
    private menu: MenuController,
    private navCtrl: NavController
  ) {
    this.menu.enable(true);
  }
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    pager: true,
    speed: 400,
    initialSlide: 1
  };

  ionViewWillEnter() {
    if (this.authService.isAccessTokenInvalido()) {
      this.navCtrl.navigateRoot('/login');
    }
  }

  ngOnInit(): void {
    this.reserved = 0;
    this.notReserved = 0;

    this.roomsService.getCountRoom(false).subscribe(r => {
      this.notReserved = r;
    }, error => {
      this.errorHandler.handle(error);
    });

    this.roomsService.getCountRoom(true).subscribe(r => {
      this.reserved = r;
    }, error => {
      this.errorHandler.handle(error);
    });

    // this.roomsService.getAllRoom().subscribe(
    //   rooms => {
    //     if (rooms.length <= 0) {
    //       this.alertService.presentFixedToast('Não há salas cadastradas.');
    //     } else {
    //       console.log(rooms);
    //       this.dataService.freeRooms(rooms);
    //     }
    //   }, error => {
    //     this.errorHandler.handle(error);
    //   });

    this.bookingService.getAllReservation().subscribe(
      bookings => {
        if (bookings.length === 0) {
          this.alertService.presentToast('Nenhuma reserva registrada.');
        } else {
          this.dataService.allReservations(bookings);
        }
      }, error => {
        this.errorHandler.handle(error);
        if (error.status === 0) {
          this.alertService.presentFixedToast('Servidor em manutenção. Tente novamente mais tarde.');
        }
      });
  }
}
