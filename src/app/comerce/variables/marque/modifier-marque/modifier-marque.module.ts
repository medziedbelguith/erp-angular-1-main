import { ModifierMarqueRoutingModule } from './modifier-marque-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModifierMarqueRoutingModule,
    SharedModule
  ]
})
export class ModifierMarqueModule { }
