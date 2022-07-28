import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListBonArticleCasseComponent } from './list-bon-article-casse.component';

const routes: Routes = [
  {
    path: '',
    component: ListBonArticleCasseComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListBonArticleCasseRoutingModule { }
