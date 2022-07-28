import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjoutFamillesRoutingModule } from './ajout-familles-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AjoutFamillesRoutingModule,
    SharedModule,
  ]
})
export class AjoutFamillesModule { }
