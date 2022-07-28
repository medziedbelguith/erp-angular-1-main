import { ListSocieteRoutingModule } from './list-societe-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListSocieteRoutingModule,
    SharedModule
  ]
})
export class ListSocieteModule { }
