import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierPointageCompteurComponent } from './modifier-pointage-compteur.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierPointageCompteurComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierPointageCompteurRoutingModule { }
