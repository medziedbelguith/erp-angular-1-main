import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifierModeleRoutingModule } from './modifier-modele-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModifierModeleRoutingModule,
    SharedModule
  ]
})
export class ModifierModeleModule { }
