import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutPointageCompteurComponent } from './ajout-pointage-compteur/ajout-pointage-compteur.component';
import { ListPointageCompteurComponent } from './list-pointage-compteur/list-pointage-compteur.component';
import { ModifierPointageCompteurComponent } from './modifier-pointage-compteur/modifier-pointage-compteur.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListPointageCompteurComponent
      },
      {
        path: 'ajout',
        component: AjoutPointageCompteurComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierPointageCompteurComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PointageCompteurRoutingModule { }
