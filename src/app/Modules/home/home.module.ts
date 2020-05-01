import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MainPageComponent } from '../../Component/main-page/main-page.component';
import { EmptyRoomComponent } from '../../Component/empty-room/empty-room.component';
import { BookedRoomComponent } from '../../Component/booked-room/booked-room.component';
import { ExpandableComponent } from '../../Shared/expandable/expandable.component';
import { CoreModule } from 'src/app/Shared/core/core.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
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
