import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjouterReglementFournisseurComponent } from './ajouter-reglement-fournisseur.component';

const routes: Routes = [
  {
    path: '',
    component: AjouterReglementFournisseurComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjouterReglementFournisseurRoutingModule { }
