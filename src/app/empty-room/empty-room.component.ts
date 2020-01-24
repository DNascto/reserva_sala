import { Room } from './../Component/Room';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

const controller = document.querySelector('ion-alert-controller');
// const button = document.querySelector('ion-button');
// button.addEventListener('click', handleButtonClick);



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

  constructor(public alertController: AlertController) {}

  ngOnInit() {}

  reserveRoom() {
    alert('Current room is: ' + this.currentRoom.name);
  }

  onSelect(event: Room) {
    this.currentRoom = event;
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
