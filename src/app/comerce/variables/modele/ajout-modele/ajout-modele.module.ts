import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AjoutModeleRoutingModule } from './ajout-modele-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AjoutModeleRoutingModule,
    SharedModule
  ]
})
export class AjoutModeleModule { }
