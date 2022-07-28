import { SharedModule } from '../../../theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsBonTravailRoutingModule } from './details-bon-travail-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DetailsBonTravailRoutingModule,
    SharedModule
  ]
})
export class DetailsBonTravailModule { }
