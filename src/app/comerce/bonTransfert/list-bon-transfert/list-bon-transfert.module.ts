import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBonTransfertRoutingModule } from './list-bon-transfert-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListBonTransfertRoutingModule,
    SharedModule,
  ]
})
export class ListBonTransfertModule { }
