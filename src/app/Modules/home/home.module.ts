import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MainPageComponent } from '../../Component/main-page/main-page.component';
import { EmptyRoomComponent } from '../../Component/empty-room/empty-room.component';
import { BookedRoomComponent } from '../../Component/booked-room/booked-room.component';
import { ExpandableComponent } from "../../Component/expandable/expandable.component";


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
    BookedRoomComponent,
    ExpandableComponent
  ]
})
export class HomePageModule { }
