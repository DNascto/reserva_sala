import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MainPageComponent } from '../main-page/main-page.component';
import { EmptyRoomComponent } from '../empty-room/empty-room.component';
import { BookedRoomComponent } from '../booked-room/booked-room.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
    MainPageComponent,
    EmptyRoomComponent,
    BookedRoomComponent
  ]
})
export class HomePageModule { }
