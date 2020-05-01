import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/Service/Room.service';
import { ErrorHandlerService } from 'src/app/Service/error-handler.service';
import { Room } from 'src/app/Models/Room';
import { AlertService } from 'src/app/Service/alert.service';

@Component({
  selector: 'app-manage-room',
  templateUrl: './manage-room.page.html',
  styleUrls: ['./manage-room.page.scss'],
})
export class ManageRoomPage implements OnInit {
  public registredRooms: any = [];

  constructor(
    private route: Router,
    private roomService: RoomService,
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.roomService.getAllRoom().subscribe(
      rooms => {
        rooms.forEach(i => {
          this.registredRooms.push({ expanded: false, room: i });
        });
      }
    );
  }

  expandItem(item): void {
    if (item.expanded) {
      // item.expanded = false;
    } else {
      this.registredRooms.map(listItem => {
        // tslint:disable-next-line: triple-equals
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  addRoom() {
    this.route.navigateByUrl('/create-update-room');
  }

  deleteRoom(room: Room) {
    this.roomService.deleteRoomById(room.id).subscribe(
      () => {
        this.alertService.presentToast('Sala excluída com sucesso.');
      }, error => {
        this.errorHandler.handle(error);
      }
    );
  }

  updateRoom() {
    console.log('update');
  }
  onSelect(event: Room) {
    console.log('seila');
  }
  infoRoom() {
    //
  }
}
