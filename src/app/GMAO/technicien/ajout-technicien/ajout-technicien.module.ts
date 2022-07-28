import { AjoutTechnicienRoutingModule } from './ajout-technicien-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedGlobalModule } from 'src/app/shared-global/shared-global.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AjoutTechnicienRoutingModule,
    SharedGlobalModule,
    SharedModule,
  ]
})
export class AjoutTechnicienModule { }
