import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TypeTierRoutingModule } from './type-tier-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TypeTierRoutingModule,
    SharedModule,
  ]
})
export class TypeTierModule { }
