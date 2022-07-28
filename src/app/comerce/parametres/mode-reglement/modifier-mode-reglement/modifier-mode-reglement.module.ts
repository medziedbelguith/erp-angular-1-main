import { ModifierModeReglementRoutingModule } from './modifier-mode-reglement-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModifierModeReglementRoutingModule,
    SharedModule
  ]
})
export class ModifierModeReglementModule { }
