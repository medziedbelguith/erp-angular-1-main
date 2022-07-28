import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AjoutBonTransfertRoutingModule } from './ajout-bon-transfert-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AjoutBonTransfertRoutingModule,
    SharedModule
  ]
})
export class AjoutBonTransfertModule { }
