import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListOrdreEmissionRoutingModule } from './list-ordre-emission-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListOrdreEmissionRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class ListOrdreEmissionModule { }
