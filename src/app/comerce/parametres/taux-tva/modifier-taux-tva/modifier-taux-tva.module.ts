import { ModifierTauxTvaRoutingModule } from './modifier-taux-tva-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModifierTauxTvaRoutingModule,
    SharedModule
  ]
})
export class ModifierTauxTvaModule { }
