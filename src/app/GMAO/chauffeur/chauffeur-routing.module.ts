import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutChauffeurComponent } from './ajout-chauffeur/ajout-chauffeur.component';
import { ListChauffeurComponent } from './list-chauffeur/list-chauffeur.component';
import { ModifierChauffeurComponent } from './modifier-chauffeur/modifier-chauffeur.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListChauffeurComponent
      },
      {
        path: 'ajout',
        component: AjoutChauffeurComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierChauffeurComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChauffeurRoutingModule { }
