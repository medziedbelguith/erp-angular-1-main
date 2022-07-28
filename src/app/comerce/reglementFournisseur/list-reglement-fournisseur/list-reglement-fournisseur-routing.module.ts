import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListReglementFournisseurComponent } from './list-reglement-fournisseur.component';

const routes: Routes = [
  {
    path: '',
    component: ListReglementFournisseurComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListReglementFournisseurRoutingModule { }
