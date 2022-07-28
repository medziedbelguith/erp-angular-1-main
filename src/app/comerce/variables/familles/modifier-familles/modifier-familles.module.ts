import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifierFamillesRoutingModule } from './modifier-familles-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModifierFamillesRoutingModule,
    SharedModule,
  ]
})
export class ModifierFamillesModule { }
