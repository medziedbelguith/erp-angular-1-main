import { TypeFraisRoutingModule } from './type-frais-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    TypeFraisRoutingModule
  ]
})
export class TypeFraisModule { }
