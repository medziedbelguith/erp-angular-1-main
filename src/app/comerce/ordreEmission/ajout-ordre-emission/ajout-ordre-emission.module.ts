import { SharedModule } from '../../../theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjoutOrdreEmissionRoutingModule } from './ajout-ordre-emission-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AjoutOrdreEmissionRoutingModule,
    SharedModule
  ]
})
export class AjoutOrdreEmissionModule { }
