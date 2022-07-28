import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierArticleComponent } from './modifier-article.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierArticleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierArticleRoutingModule { }
