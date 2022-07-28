import { ListTransporteurRoutingModule } from './list-transporteur-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListTransporteurRoutingModule,
    SharedModule
  ]
})
export class ListTransporteurModule { }
