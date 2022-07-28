import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProjetInterneComponent } from './list-projet-interne/list-projet-interne.component';
import { AjoutProjetInterneComponent } from './ajout-projet-interne/ajout-projet-interne.component';
import { ModifierProjetInterneComponent } from './modifier-projet-interne/modifier-projet-interne.component';
import { DetailsProjetInterneComponent } from './details-projet-interne/details-projet-interne.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListProjetInterneComponent
      },
      {
        path: 'ajout',
        component: AjoutProjetInterneComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierProjetInterneComponent
      },
      {
        path: 'details/:id',
        component: DetailsProjetInterneComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetInterneRoutingModule { }
