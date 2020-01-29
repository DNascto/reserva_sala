import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomBookingPage } from './room-booking.page';

const routes: Routes = [
  {
    path: '',
    component: RoomBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomBookingPageRoutingModule {}
