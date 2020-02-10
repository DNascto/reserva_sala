import { Component, OnInit, Input } from '@angular/core';
import { RoomService } from 'src/app/Service/Room.service';
import { DataService } from 'src/app/Service/data.service';
import { ReservationService } from 'src/app/Service/Reservation.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  notReserved: number;
  reserved: number;

  controller = document.querySelector('div > ion-toast-controller');

  constructor(
    private roomsService: RoomService,
    private bookingService: ReservationService,
    private dataService: DataService,
    public toastController: ToastController
  ) { }
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    pager: true,
    speed: 400,
    initialSlide: 1
  };

  ngOnInit(): void {
    let user = {
      name: 'Daniel',
      immediatlyApprovation: true
    }
    localStorage.setItem('user', JSON.stringify(user));

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
      localStorage.setItem('freeRooms', JSON.stringify(r));
    }, err => {
      console.log(err);
    });

    this.bookingService.getAllReservation().subscribe(b => {
      if (b.length === 0) {
        this.presentToast('Nenhum dado registrado');
      } else {
        this.dataService.allReservations(b);
      }
    }, err => {
      console.log(err);
      if (err.status === 0) {
        // this.presentToast('Erro de conexão. Verifique sua conexão com a internet.');
        this.presentToast('Servidor em manutenção. Tente novamente mais tarde.');
      } else if (err.status === 500) {
        this.presentToast('Erro de requisição. Tente novamente mais tarde.');
      }
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      color: 'dark',
      message: msg,
      showCloseButton: true
      // duration: 2000
    });
    toast.present();
  }
}
