import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/Service/data.service';
import { Room } from '../../Models/Room';

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
  maxDate;
  
  constructor(
    private dataService: DataService,
    private route: Router,
    public alertController: AlertController,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.today = new Date().toISOString();
    let now = new Date();
    now.setDate(now.getFullYear() + 30);
    this.maxDate = now.toISOString();

    this.dataService.varCurrentRooms.subscribe(data => {
      data.forEach(i => {
        this.items.push({ expanded: false, sala: i });
      });
    });
    this.toggleVisibility();
  }

  expandItem(item): void {
    if (item.expanded) {
      // item.expanded = false;
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

  onSelect(event: Room) {
    this.currentRoom = event;
  }

  callBookingPage(): void {
    this.dataService.selectedRoom(this.currentRoom);
    this.route.navigate(['/room-booking']);
  }

  async presentAlert(item: Room) {
    const alert = await this.alertController.create({
      header: 'Informações',
      subHeader: item.name,
      message: 'Lugares: ' + item.places +
        '<br/>Projetor: ' + (item.projector ? 'Sim' : 'Não'),
      buttons: ['OK']
    });

    await alert.present();
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      if (this.items.length == 100) {
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
