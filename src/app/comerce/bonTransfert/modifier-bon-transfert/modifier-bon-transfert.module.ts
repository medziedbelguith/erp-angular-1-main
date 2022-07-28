import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ModifierBonTransfertRoutingModule } from './modifier-bon-transfert-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModifierBonTransfertRoutingModule,
    SharedModule
  ]
})
export class ModifierBonTransfertModule { }
