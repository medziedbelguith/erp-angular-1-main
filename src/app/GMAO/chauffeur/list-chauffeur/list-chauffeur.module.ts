import { SharedModule } from './../../../theme/shared/shared.module';
import { ListChauffeurRoutingModule } from './list-chauffeur-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListChauffeurRoutingModule,
    SharedModule
  ]
})
export class ListChauffeurModule { }
