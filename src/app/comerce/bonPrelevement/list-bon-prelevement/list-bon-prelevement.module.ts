import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBonPrelevementRoutingModule } from './list-bon-prelevement-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListBonPrelevementRoutingModule,
    SharedModule,
  ]
})
export class ListBonPrelevementModule { }
