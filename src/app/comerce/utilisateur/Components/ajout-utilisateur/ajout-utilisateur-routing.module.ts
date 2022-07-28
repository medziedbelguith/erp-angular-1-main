import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutUtilisateurComponent } from './ajout-utilisateur.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutUtilisateurComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutUtilisateurRoutingModule { }
