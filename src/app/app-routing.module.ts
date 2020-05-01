import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    // loadChildren: './Modules/home/home.module#HomePageModule', canActivate: [AuthGuard]
    loadChildren: () => import('./Modules/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: () => import('./Modules/list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'room-booking',
    loadChildren: () => import('./Component/room-booking/room-booking.module').then(m => m.RoomBookingPageModule)
  },
  {
    path: 'configs',
    loadChildren: () => import('./Modules/configs/configs.module').then(m => m.ConfigsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'pending-booking',
    loadChildren: () => import('./Modules/pending-booking/pending-booking.module').then(m => m.PendingBookingPageModule)
  },
  {
    path: 'manage-room',
    loadChildren: () => import('./Modules/manage-room/manage-room.module').then(m => m.ManageRoomPageModule)
  },
  {
    path: 'create-update-room',
    loadChildren: () => import('./pages/create-update-room/create-update-room.module').then(m => m.CreateUpdateRoomPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
