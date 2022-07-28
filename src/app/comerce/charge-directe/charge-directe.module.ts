import { ChargeDirecteRoutingModule } from './charge-directe-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChargeDirecteRoutingModule,
    SharedModule,
  ]
})
export class ChargeDirecteModule { }
