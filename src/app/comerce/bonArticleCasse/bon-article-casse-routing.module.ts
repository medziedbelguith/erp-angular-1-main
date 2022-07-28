import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutBonArticleCasseComponent } from './ajout-bon-article-casse/ajout-bon-article-casse.component';
import { DetailsBonArticleCasseComponent } from './details-bon-article-casse/details-bon-article-casse.component';
import { ListBonArticleCasseComponent } from './list-bon-article-casse/list-bon-article-casse.component';
import { ModifierBonArticleCasseComponent } from './modifier-bon-article-casse/modifier-bon-article-casse.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListBonArticleCasseComponent
      },
      {
        path: 'ajout',
        component: AjoutBonArticleCasseComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierBonArticleCasseComponent
      },
      {
        path: 'details/:id',
        component: DetailsBonArticleCasseComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonArticleCasseRoutingModule { }
