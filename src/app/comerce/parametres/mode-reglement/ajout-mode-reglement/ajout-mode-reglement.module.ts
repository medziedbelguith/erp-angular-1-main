import { SharedModule } from '../../../../theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjoutModeReglementRoutingModule } from './ajout-mode-reglement-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AjoutModeReglementRoutingModule,
    SharedModule
  ]
})
export class AjoutModeReglementModule { }
