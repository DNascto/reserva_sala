import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageRoomPageRoutingModule } from './manage-room-routing.module';

import { ManageRoomPage } from './manage-room.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageRoomPageRoutingModule
  ],
  declarations: [ManageRoomPage]
})
export class ManageRoomPageModule {}
