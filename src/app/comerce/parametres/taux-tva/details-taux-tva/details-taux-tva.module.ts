import { SharedModule } from '../../../../theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsTauxTvaRoutingModule } from './details-taux-tva-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DetailsTauxTvaRoutingModule,
    SharedModule
  ]
})
export class DetailsTauxTvaModule { }
