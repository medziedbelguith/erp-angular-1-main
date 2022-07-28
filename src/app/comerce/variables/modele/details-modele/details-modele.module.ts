import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DetailsModeleRoutingModule } from './details-modele-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DetailsModeleRoutingModule,
    SharedModule
  ]
})
export class DetailsModeleModule { }
