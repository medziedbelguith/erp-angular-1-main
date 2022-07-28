import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ChargeModeReglRoutingModule } from './charge-mode-regl-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChargeModeReglRoutingModule,
    SharedModule,
  ]
})
export class ChargeModeReglModule { }
