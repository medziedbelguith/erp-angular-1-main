import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TransporteurRoutingModule } from './transporteur-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TransporteurRoutingModule,
    SharedModule
  ]
})
export class TransporteurModule { }
