import { SharedGlobalModule } from 'src/app/shared-global/shared-global.module';
import { ListTechnicienRoutingModule } from './list-technicien-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListTechnicienRoutingModule,
    SharedGlobalModule
  ]
})
export class ListTechnicienModule { }
