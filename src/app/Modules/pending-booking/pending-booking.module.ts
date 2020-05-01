import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingBookingPageRoutingModule } from './pending-booking-routing.module';

import { PendingBookingPage } from './pending-booking.page';
import { ExpandableComponent } from 'src/app/Shared/expandable/expandable.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingBookingPageRoutingModule
  ],
  declarations: [ PendingBookingPage
  ]
})
export class PendingBookingPageModule {}
