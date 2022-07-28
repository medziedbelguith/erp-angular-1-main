import { SharedModule } from './../../theme/shared/shared.module';
import { ChauffeurRoutingModule } from './chauffeur-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChauffeurRoutingModule,
    SharedModule
  ]
})
export class ChauffeurModule { }
