import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BonTravailRoutingModule } from './bon-travail-routing.module';
import { BonTravailHtmlComponent } from './bon-travail-html/bon-travail-html.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BonTravailRoutingModule,
    SharedModule,
  ]
})
export class BonTravailModule { }
