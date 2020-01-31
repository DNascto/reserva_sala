import { Room } from '../Room';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { RoomBookingPage } from '../room-booking/room-booking.page';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-empty-room',
  templateUrl: './empty-room.component.html',
  styleUrls: ['./empty-room.component.scss'],
})

export class EmptyRoomComponent implements OnInit {
  public items: any = [];
  currentRoom: Room;
  today;
  nextThirty;
  selectedDate;
  customPickerOptions: any;
  showReserves;
  rooms: Room[];
  // lstRoom = [
  //   new Room('Sala Grande', 50, true),
  //   new Room('Sala Media', 25, true),
  //   new Room('Sala Pequena', 10, false)
  // ];

  constructor(
    private dataService: DataService,
    private route: Router,
    public alertController: AlertController,
    public navCtrl: NavController
  ) { }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }

  }
  ngOnInit() {
    this.dataService.currentRooms.subscribe(data => {
      this.rooms = data;
      data.forEach(i => {
        this.items.push({ expanded: false, sala: i });
      });
    });
    this.toggleVisibility();
  }

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


  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.items.length == 10) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleVisibility() {
    var x = document.getElementById("opt1");
    var y = document.getElementById("opt2");

    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.display = "none";
    } else {
      x.style.display = "none";
      y.style.display = "block";
    }
  }
}
