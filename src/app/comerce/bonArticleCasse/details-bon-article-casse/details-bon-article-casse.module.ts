import { SharedModule } from '../../../theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsBonArticleCasseRoutingModule } from './details-bon-article-casse-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DetailsBonArticleCasseRoutingModule,
    SharedModule
  ]
})
export class DetailsBonArticleCasseModule { }
