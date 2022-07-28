import { AjoutTauxTvaRoutingModule } from './ajout-taux-tva-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AjoutTauxTvaRoutingModule,
    SharedModule
  ]
})
export class AjoutTauxTvaModule { }
