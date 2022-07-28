import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ModifierSousFamillesRoutingModule } from './modifier-sous-familles-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModifierSousFamillesRoutingModule,
    SharedModule,
  ]
})
export class ModifierSousFamillesModule { }
