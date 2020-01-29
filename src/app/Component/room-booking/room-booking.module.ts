import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomBookingPageRoutingModule } from './room-booking-routing.module';

import { RoomBookingPage } from './room-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomBookingPageRoutingModule
  ],
  declarations: [RoomBookingPage]
})
export class RoomBookingPageModule {}
