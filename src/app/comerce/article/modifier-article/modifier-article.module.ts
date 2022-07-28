import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { ModifierArticleRoutingModule } from './modifier-article-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModifierArticleRoutingModule,
    SharedModule
  ]
})
export class ModifierArticleModule { }
