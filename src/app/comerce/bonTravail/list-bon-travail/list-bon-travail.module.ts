import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBonTravailRoutingModule } from './list-bon-travail-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListBonTravailRoutingModule,
    SharedModule,
  ]
})
export class ListBonTravailModule { }
