import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListReglementFournisseurComponent } from './list-reglement-fournisseur/list-reglement-fournisseur.component';
import { AjouterReglementFournisseurComponent } from './ajouter-reglement-fournisseur/ajouter-reglement-fournisseur.component';
import { ModifierReglementFournisseurComponent } from './modifier-reglement-fournisseur/modifier-reglement-fournisseur.component';
import { ListEcheanceFournisseurComponent } from './list-echeance-fournisseur/list-echeance-fournisseur.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListReglementFournisseurComponent
      },
      {
        path: 'ajout',
        component: AjouterReglementFournisseurComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierReglementFournisseurComponent
      },
      {
        path: 'echeanceFournisseur',
        component: ListEcheanceFournisseurComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReglementfournisseurRoutingModule { }
