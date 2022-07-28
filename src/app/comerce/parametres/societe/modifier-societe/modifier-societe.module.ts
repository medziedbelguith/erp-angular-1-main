import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ModifierSocieteRoutingModule } from './modifier-societe-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModifierSocieteRoutingModule,
    SharedModule
  ]
})
export class ModifierSocieteModule { }
