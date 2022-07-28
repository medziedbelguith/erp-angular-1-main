import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonnelRoutingModule } from './personnel-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PersonnelRoutingModule,
    SharedModule
  ]
})
export class PersonnelModule { }
