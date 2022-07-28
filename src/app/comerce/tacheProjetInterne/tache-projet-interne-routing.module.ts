import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTacheProjetInterneComponent } from './list-tache-projet-interne/list-tache-projet-interne.component';
import { AjoutTacheProjetInterneComponent } from './ajout-tache-projet-interne/ajout-tache-projet-interne.component';
import { ModifierTacheProjetInterneComponent } from './modifier-tache-projet-interne/modifier-tache-projet-interne.component';
import { DetailsTacheProjetInterneComponent } from './details-tache-projet-interne/details-tache-projet-interne.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListTacheProjetInterneComponent
      },
      {
        path: 'ajout',
        component: AjoutTacheProjetInterneComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierTacheProjetInterneComponent
      },
      {
        path: 'details/:id',
        component: DetailsTacheProjetInterneComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TacheProjetInterneRoutingModule { }
