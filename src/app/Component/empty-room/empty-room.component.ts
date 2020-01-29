import { Room } from '../Room';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { RoomBookingPage } from '../room-booking/room-booking.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty-room',
  templateUrl: './empty-room.component.html',
  styleUrls: ['./empty-room.component.scss'],
})

export class EmptyRoomComponent implements OnInit {

  currentRoom: Room;

  lstRoom = [
    new Room('Sala Grande', 50, true),
    new Room('Sala Media', 25, true),
    new Room('Sala Pequena', 10, false)
  ];

  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    private route: Router) { }

  ngOnInit() { }

  reserveRoom() {
    alert('Current room is: ' + this.currentRoom.name);
  }

  onSelect(event: Room) {
    this.currentRoom = event;
  }

  callBookingPage(): void {
    this.route.navigate(['/room-booking']);
  }

  async presentAlert(item: Room) {
    const alert = await this.alertController.create({
      header: 'Informações',
      subHeader: item.name,
      message: 'Lugares: ' + item.places +
        '\n Projetor: ' + (item.projector ? 'Sim' : 'Não'),
      buttons: ['OK']
    });

    await alert.present();
  }
}
