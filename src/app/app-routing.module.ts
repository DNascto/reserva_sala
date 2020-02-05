import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./Modules/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./Modules/list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'room-booking',
    loadChildren: () => import('./Component/room-booking/room-booking.module').then( m => m.RoomBookingPageModule)
  },
  {
    path: 'configs',
    loadChildren: () => import('./Modules/configs/configs.module').then( m => m.ConfigsPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
