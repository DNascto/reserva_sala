import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandableComponent } from '../expandable/expandable.component';
import { ExpandableModule } from '../expandable/expandable.module';



@NgModule({
  declarations: [
    // ExpandableComponent
  ],
  imports: [
    CommonModule,
    ExpandableModule
  ],

  exports: [
    CommonModule,
    ExpandableModule
  ]
})
export class CoreModule { }
