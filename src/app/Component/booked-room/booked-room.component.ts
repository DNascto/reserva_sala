import { Reservation } from '../../Models/Reservation';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/Service/data.service';
import { ToastController } from '@ionic/angular';
import addMinutes from 'date-fns/addMinutes';

@Component({
  selector: 'app-booked-room',
  templateUrl: './booked-room.component.html',
  styleUrls: ['./booked-room.component.scss']
})

export class BookedRoomComponent implements OnInit ,  AfterViewInit {
  today;
  nextThirty;
  selectedDate: string;
  customPickerOptions: any;
  showReserves;
  bookings: Reservation[];
  noConnectionOrData: boolean;

  constructor(private dataService: DataService, public toastController: ToastController) {
    this.selectedDate = new Date().toString();
    this.today = new Date().toISOString();
    
    let now = new Date();
    now.setDate(now.getFullYear() + 30);
    this.nextThirty = now.toISOString();
  }

  ngOnInit() {
    this.dataService.varCurrentBookings.subscribe(data => {
      this.bookings = data;
    }, err => {
      this.noConnectionOrData = true;
      console.log(err);
    });
    this.sortDay();

  }
  ngAfterViewInit(){
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

  onChange(event: any) {
    this.selectedDate = new Date(event.detail.value).toISOString();

    this.sortDay();
  }

  sortDay() {
    this.showReserves = [];
    var now = new Date();
    for (const item of this.bookings) {
      var date: Date = new Date(item.date);

      // var now = new Date();
      // var utc = new Date(date.getTime() + now.getTimezoneOffset() * 60000);
      // console.log('teste: ' + new Date(date.getTime() + now.getTimezoneOffset() * 60000).toString());
      
      if (new Date(item.date).toLocaleDateString() == new Date(this.selectedDate).toLocaleDateString()) {
        // set timezone at date
        // coloca a data no fuso horario atual
        // item.date = new Date(date.getTime() + now.getTimezoneOffset() * 60000).toString();

        // calculate the time of reserved of booking
        // calcula o tempo que a sala foi reservada
        var res = addMinutes(new Date(item.date), item.period);
        item.checkout = new Date(res);
        this.showReserves.push(item);
      }
    }
  }
}

// console.log(new Date().toLocaleDateString());
