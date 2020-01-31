import { Room } from '../Room';
import { Reservation } from '../Reservation';
import { Component, OnInit, Output } from '@angular/core';
import { format } from 'date-fns';
import { DataService } from 'src/app/Service/data.service';

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

  reservation = [
    new Reservation(new Date(), new Room('Sala Grande', 50, true), 3, 'Bill Zuck'),
    new Reservation(new Date(), new Room('Sala Media', 25, true), 2, 'Steve Gates'),
    new Reservation(new Date(), new Room('Sala Pequena', 10, false), 5, 'Mark Jobs')
  ];

  constructor(private dataService: DataService) {
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
    });
    this.sortDay();
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
