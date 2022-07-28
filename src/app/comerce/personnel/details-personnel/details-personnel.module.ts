import { DetailsPersonnelRoutingModule } from './details-personnel-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DetailsPersonnelRoutingModule,
    SharedModule
  ]
})
export class DetailsPersonnelModule { }
