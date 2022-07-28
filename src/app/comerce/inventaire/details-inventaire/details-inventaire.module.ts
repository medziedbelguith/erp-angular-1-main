import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DetailsInventaireRoutingModule } from './details-inventaire-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DetailsInventaireRoutingModule,
    SharedModule
  ]
})
export class DetailsInventaireModule { }
