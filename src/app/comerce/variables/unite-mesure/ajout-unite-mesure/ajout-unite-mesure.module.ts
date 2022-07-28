import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AjoutUniteMesureComponent } from './ajout-unite-mesure.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AjoutUniteMesureComponent,
    SharedModule
  ]
})
export class AjoutUniteMesureModule { }
