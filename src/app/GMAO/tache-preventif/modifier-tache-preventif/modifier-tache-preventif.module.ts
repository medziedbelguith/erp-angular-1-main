import { SharedModule } from './../../../theme/shared/shared.module';
import { ModifierTachePreventifRoutingModule } from './modifier-tache-preventif-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModifierTachePreventifRoutingModule,
    SharedModule
  ]
})
export class ModifierTachePreventifModule { }
