import { DetailsSousFamillesComponent } from './details-sous-familles/details-sous-familles.component';
import { ModifierSousFamillesComponent } from './modifier-sous-familles/modifier-sous-familles.component';
import { AjoutSousFamillesComponent } from './ajout-sous-familles/ajout-sous-familles.component';
import { ListSousFamillesComponent } from './list-sous-familles/list-sous-familles.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListSousFamillesComponent
      },
      {
        path: 'ajout',
        component: AjoutSousFamillesComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierSousFamillesComponent
      },
      {
        path: 'details/:id',
        component: DetailsSousFamillesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SousFamillesRoutingModule { }
