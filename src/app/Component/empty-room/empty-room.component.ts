import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from 'src/app/Service/data.service';
import { Room } from '../../Models/Room';
import { RoomService } from 'src/app/Service/Room.service';
import { AlertService } from 'src/app/Service/alert.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';

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
    private roomService: RoomService,
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService,
    private route: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.today = new Date().toISOString();
    const now = new Date();
    now.setDate(now.getFullYear() + 30);
    this.maxDate = now.toISOString();

    this.roomService.getAllRoom().subscribe(
      rooms => {
        if (rooms.length <= 0) {
          this.alertService.presentFixedToast('Não há salas cadastradas.');
        } else {
          rooms.forEach(i => {
            this.items.push({ expanded: false, sala: i });
          });
        }
      }, error => {
        this.errorHandler.handle(error);
      });

    this.toggleVisibility();
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item === listItem) {
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
      if (this.items.length === 100) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleVisibility() {
    const x = document.getElementById('opt1');
    const y = document.getElementById('opt2');

    if (x.style.display === 'none') {
      x.style.display = 'block';
      y.style.display = 'none';
    } else {
      x.style.display = 'none';
      y.style.display = 'block';
    }
  }
}
