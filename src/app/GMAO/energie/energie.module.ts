import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { EnergieRoutingModule } from './energie-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EnergieRoutingModule,
    SharedModule,
  ]
})
export class EnergieModule { }
