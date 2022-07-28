import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ModifierOrdreEmissionRoutingModule } from './modifier-ordre-emission-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModifierOrdreEmissionRoutingModule,
    SharedModule,
  ]
})
export class ModifierOrdreEmissionModule { }
