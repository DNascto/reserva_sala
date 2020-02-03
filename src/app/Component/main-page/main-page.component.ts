import { Component, OnInit, Input, ViewChild, ViewChildren } from '@angular/core';
import { DataService } from 'src/app/Service/data.service';
import { Room } from '../Room';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    pager: true
  };

  @Input() notReserved: number;
  @Input() reserved: number;

  constructor() { }
  
  ngOnInit() {
    this.notReserved = 0;
    this.reserved = 0;
  }
}