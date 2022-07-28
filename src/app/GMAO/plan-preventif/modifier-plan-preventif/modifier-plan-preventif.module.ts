import { SharedModule } from './../../../theme/shared/shared.module';
import { ModifierPlanPreventifRoutingModule } from './modifier-plan-preventif-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModifierPlanPreventifRoutingModule,
    SharedModule
  ]
})
export class ModifierPlanPreventifModule { }
