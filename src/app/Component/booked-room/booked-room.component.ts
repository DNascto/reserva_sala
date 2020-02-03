import { Reservation } from '../Reservation';
import { Component, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/Service/data.service';
import { ToastController } from '@ionic/angular';
import { Room } from '../Room';
import { format } from 'date-fns';

@Component({
  selector: 'app-booked-room',
  templateUrl: './booked-room.component.html',
  styleUrls: ['./booked-room.component.scss']
})

export class BookedRoomComponent implements OnInit {
  today;
  nextThirty;
  selectedDate;
  customPickerOptions: any;
  showReserves;
  bookings: Reservation[];
  noConnectionOrData: boolean

  constructor(private dataService: DataService, public toastController: ToastController) {
    this.today = new Date().toISOString();
    this.selectedDate = new Date().toLocaleDateString();
    let now = new Date();
    now.setDate(now.getFullYear() + 30);
    this.nextThirty = now.toISOString();

    /* quando descobrir como recuperar o valor selecionado atraves do "(ionChange)"
      o "customPickerOptions" pode ser excluido. Por enquanto, ele é a forma de 
      obter-se o valor e atribuir ao "selectedDate"
     */
    this.customPickerOptions = {
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Selecionar',
          handler: (e) => {
            this.selectedDate = new Date(e.year.value, (e.month.value-1), e.day.value).toLocaleDateString();
            this.sortDay(); 
          }
        }
      ]
    };
  }

  ngOnInit() { 
    this.dataService.currentBookings.subscribe(data => {
      this.bookings = data;
    }, err => {
      this.noConnectionOrData = true;
      console.log(err);
    });
    this.sortDay();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }
  onChange(event: any){
    console.log(event);
    
  }
  
  sortDay() {
    this.showReserves = [];
    for (const item of this.bookings) {
      // console.log("item: " + item.date.toLocaleDateString());
      // console.log("dia : " + this.selectedDate);
      if (item.date.toLocaleDateString() == this.selectedDate) {
        this.showReserves.push(item);
      }
    }
  }
}

// console.log(new Date().toLocaleDateString());
