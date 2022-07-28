import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsUtilisateurComponent } from './details-utilisateur.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsUtilisateurComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsUtilisateurRoutingModule { }
