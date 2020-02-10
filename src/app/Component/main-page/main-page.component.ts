import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})

export class MainPageComponent implements OnInit {
  @Input() notReserved: number;
  @Input() reserved: number;

  constructor() { }
  
  ngOnInit() {
    this.notReserved = 0;
    this.reserved = 0;
  }
}