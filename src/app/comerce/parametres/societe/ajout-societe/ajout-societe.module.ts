import { SharedModule } from '../../../../theme/shared/shared.module';
import { AjoutSocieteRoutingModule } from './ajout-societe-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AjoutSocieteRoutingModule,
    SharedModule
  ]
})
export class AjoutSocieteModule { }
