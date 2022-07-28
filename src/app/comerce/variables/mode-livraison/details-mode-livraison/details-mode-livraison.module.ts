import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsCategoriesRoutingModule } from '../../categories/details-categories/details-categories-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DetailsCategoriesRoutingModule,
    SharedModule
  ]
})
export class DetailsModeLivraisonModule { }
