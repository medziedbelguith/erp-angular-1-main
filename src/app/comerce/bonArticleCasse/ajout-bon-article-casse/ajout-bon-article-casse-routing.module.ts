import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutBonArticleCasseComponent } from './ajout-bon-article-casse.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutBonArticleCasseComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutBonArticleCasseRoutingModule { }
