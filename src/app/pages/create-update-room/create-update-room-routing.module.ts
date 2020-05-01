import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateUpdateRoomPage } from './create-update-room.page';

const routes: Routes = [
  {
    path: '',
    component: CreateUpdateRoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateUpdateRoomPageRoutingModule {}
