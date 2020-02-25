import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-room',
  templateUrl: './manage-room.page.html',
  styleUrls: ['./manage-room.page.scss'],
})
export class ManageRoomPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  addRoom(){
    this.route.navigateByUrl('/register');
  }
}
