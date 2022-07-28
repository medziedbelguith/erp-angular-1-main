import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutChauffeurComponent } from './ajout-chauffeur.component';

const routes: Routes = [
  {
    path: '',
    component:  AjoutChauffeurComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutChauffeurRoutingModule { }
