import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageRoomPage } from './manage-room.page';

const routes: Routes = [
  {
    path: '',
    component: ManageRoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageRoomPageRoutingModule {}
