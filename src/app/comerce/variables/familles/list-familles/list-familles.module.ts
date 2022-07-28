import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFamillesRoutingModule } from './list-familles-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListFamillesRoutingModule,
    SharedModule,
  ]
})
export class ListFamillesModule { }
