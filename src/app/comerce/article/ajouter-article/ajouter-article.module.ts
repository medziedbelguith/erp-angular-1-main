import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';


import { AjouterArticleRoutingModule } from './ajouter-article-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AjouterArticleRoutingModule,
    SharedModule
  ]
})
export class AjouterArticleModule { }
