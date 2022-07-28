import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ListArticleRoutingModule } from './list-article-routing.module';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListArticleRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class ListArticleModule { }
