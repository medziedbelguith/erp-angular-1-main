import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBonArticleCasseRoutingModule } from './list-bon-article-casse-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListBonArticleCasseRoutingModule,
    SharedModule,
  ]
})
export class ListBonArticleCasseModule { }
