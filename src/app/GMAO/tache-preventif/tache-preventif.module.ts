import { SharedModule } from './../../theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TachePreventifRoutingModule } from './tache-preventif-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TachePreventifRoutingModule,
    SharedModule
  ]
})
export class TachePreventifModule { }
