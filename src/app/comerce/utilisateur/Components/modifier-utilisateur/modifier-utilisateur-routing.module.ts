import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierUtilisateurComponent } from './modifier-utilisateur.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierUtilisateurComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierUtilisateurRoutingModule { }
