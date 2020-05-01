import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export let options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(options)
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
