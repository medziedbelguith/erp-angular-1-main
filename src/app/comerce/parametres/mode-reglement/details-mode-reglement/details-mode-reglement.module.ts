import { SharedModule } from '../../../../theme/shared/shared.module';
import { DetailsModeReglementRoutingModule } from './details-mode-reglement-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DetailsModeReglementRoutingModule,
    SharedModule
  ]
})
export class DetailsModeReglementModule { }
