import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DetailsBonArticleCasseComponent } from './details-bon-article-casse.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsBonArticleCasseComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsBonArticleCasseRoutingModule { }
