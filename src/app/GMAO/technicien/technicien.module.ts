import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TechnicienRoutingModule } from './technicien-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TechnicienRoutingModule,
    SharedModule
  ]
})
export class TechnicienModule { }
