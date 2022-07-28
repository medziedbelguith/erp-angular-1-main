import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BonPrelevementRoutingModule } from './bon-prelevement-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BonPrelevementRoutingModule,
    SharedModule,
  ]
})
export class BonPrelevementModule { }
