import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierReglementFournisseurComponent } from './modifier-reglement-fournisseur.component';

const routes: Routes = [
   
  {
    path: '',
    component: ModifierReglementFournisseurComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierReglementFournisseurRoutingModule { }
