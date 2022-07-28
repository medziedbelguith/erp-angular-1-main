import { SharedModule } from '../../../../theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUniteMesureComponent } from './list-unite-mesure.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListUniteMesureComponent,
    SharedModule
  ]
})
export class ListUniteMesureModule { }
