import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BonArticleCasseRoutingModule } from './bon-article-casse-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BonArticleCasseRoutingModule,
    SharedModule,
  ]
})
export class BonArticleCasseModule { }
