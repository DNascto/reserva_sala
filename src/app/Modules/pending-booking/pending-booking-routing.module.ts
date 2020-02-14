import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendingBookingPage } from './pending-booking.page';

const routes: Routes = [
  {
    path: '',
    component: PendingBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingBookingPageRoutingModule {}
