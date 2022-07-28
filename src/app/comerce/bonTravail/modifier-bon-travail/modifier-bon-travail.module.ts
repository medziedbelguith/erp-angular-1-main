import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ModifierBonTravailRoutingModule } from './modifier-bon-travail-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModifierBonTravailRoutingModule,
    SharedModule
  ]
})
export class ModifierBonTravailModule { }
