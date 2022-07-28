import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FamillesRoutingModule } from './familles-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FamillesRoutingModule,
    SharedModule,
  ]
})
export class FamillesModule { }
