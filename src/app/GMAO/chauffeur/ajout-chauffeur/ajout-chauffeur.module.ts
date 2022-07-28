import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjoutChauffeurRoutingModule } from './ajout-chauffeur-routing.module';
import { AjoutChauffeurComponent } from './ajout-chauffeur.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SharedGlobalModule } from 'src/app/shared-global/shared-global.module';

@NgModule({
  declarations: [AjoutChauffeurComponent],
  imports: [
    CommonModule,
    AjoutChauffeurRoutingModule,
    SharedGlobalModule,
    SharedModule,
  ],
  exports:[AjoutChauffeurComponent]
})

export class AjoutChauffeurModule { }
