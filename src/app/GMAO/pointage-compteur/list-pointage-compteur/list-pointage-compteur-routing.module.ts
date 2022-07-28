import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPointageCompteurComponent } from './list-pointage-compteur.component';

const routes: Routes = [
  {
    path: '',
    component: ListPointageCompteurComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListPointageCompteurRoutingModule { }
