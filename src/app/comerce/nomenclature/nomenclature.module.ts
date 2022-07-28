import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NomenclatureRoutingModule } from './nomenclature-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NomenclatureRoutingModule,
    SharedModule
  ]
})
export class NomenclatureModule { }
