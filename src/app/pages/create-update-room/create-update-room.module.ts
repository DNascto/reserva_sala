import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateUpdateRoomPageRoutingModule } from './create-update-room-routing.module';

import { CreateUpdateRoomPage } from './create-update-room.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateUpdateRoomPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateUpdateRoomPage]
})
export class CreateUpdateRoomPageModule {}
