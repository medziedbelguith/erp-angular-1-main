import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DetailsSocieteRoutingModule } from './details-societe-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DetailsSocieteRoutingModule,
    SharedModule
  ]
})
export class DetailsSocieteModule { }
