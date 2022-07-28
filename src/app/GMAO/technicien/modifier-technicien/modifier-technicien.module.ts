import { SharedGlobalModule } from 'src/app/shared-global/shared-global.module';
import { ModifierTechnicienRoutingModule } from './modifier-technicien-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModifierTechnicienRoutingModule,
    SharedGlobalModule
  ]
})
export class ModifierTechnicienModule { }
