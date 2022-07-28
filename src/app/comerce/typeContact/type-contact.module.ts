import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TypeContactRoutingModule } from './type-contact-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TypeContactRoutingModule,
    SharedModule,
  ]
})
export class TypeContactModule { }
