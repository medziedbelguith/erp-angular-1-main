import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUtilisateurComponent } from './list-utilisateur.component';

const routes: Routes = [
  {
    path: '',
    component: ListUtilisateurComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListUtilisateurRoutingModule { }
