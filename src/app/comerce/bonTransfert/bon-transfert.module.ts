import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BonTransfertRoutingModule } from './bon-transfert-routing.module';
import { BonTransfertHtmlComponent } from './bon-transfert-html/bon-transfert-html.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BonTransfertRoutingModule,
    SharedModule,
  ]
})
export class BonTransfertModule { }
