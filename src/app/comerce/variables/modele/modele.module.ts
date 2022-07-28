import { ModeleRoutingModule } from './modele-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModeleRoutingModule,
    SharedModule
  ]
})
export class ModeleModule { }
