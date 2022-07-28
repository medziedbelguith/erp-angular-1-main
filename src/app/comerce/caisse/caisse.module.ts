import { SharedGlobalModule } from 'src/app/shared-global/shared-global.module';
import { CaisseRoutingModule } from './caisse-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CaisseRoutingModule,
    SharedGlobalModule
  ]
})
export class CaisseModule { }
