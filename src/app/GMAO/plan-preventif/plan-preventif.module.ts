import { SharedModule } from './../../theme/shared/shared.module';
import { PlanPreventifRoutingModule } from './plan-preventif-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PlanPreventifRoutingModule,
    SharedModule
  ]
})
export class PlanPreventifModule { }
