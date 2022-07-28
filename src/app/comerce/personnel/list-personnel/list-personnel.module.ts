import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ListPersonnelRoutingModule } from './list-personnel-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListPersonnelRoutingModule,
    SharedModule
  ]
})
export class ListPersonnelModule { }
