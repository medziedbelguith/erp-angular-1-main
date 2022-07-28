import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SousFamillesRoutingModule } from './sous-familles-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SousFamillesRoutingModule,
    SharedModule,
  ]
})
export class SousFamillesModule { }
