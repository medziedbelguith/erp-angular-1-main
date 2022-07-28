import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ListMarqueRoutingModule } from './list-marque-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListMarqueRoutingModule,
    SharedModule
  ]
})

export class ListMarqueModule { }
