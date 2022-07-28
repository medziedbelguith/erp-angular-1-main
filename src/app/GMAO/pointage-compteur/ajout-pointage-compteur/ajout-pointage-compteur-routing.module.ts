import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutPointageCompteurComponent } from './ajout-pointage-compteur.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutPointageCompteurComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutPointageCompteurRoutingModule { }
