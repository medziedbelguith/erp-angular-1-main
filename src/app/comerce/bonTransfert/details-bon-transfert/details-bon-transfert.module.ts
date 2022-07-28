import { SharedModule } from '../../../theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsBonTransfertRoutingModule } from './details-bon-transfert-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DetailsBonTransfertRoutingModule,
    SharedModule
  ]
})
export class DetailsBonTransfertModule { }
