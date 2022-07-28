import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListBonRetourFournisseurComponent } from './list-bon-retour-fournisseur/list-bon-retour-fournisseur.component';
import { AjoutBonRetourFournisseurComponent } from './ajout-bon-retour-fournisseur/ajout-bon-retour-fournisseur.component';
import { ModifierBonRetourFournisseurComponent } from './modifier-bon-retour-fournisseur/modifier-bon-retour-fournisseur.component';
import { DetailsBonRetourFournisseurComponent } from './details-bon-retour-fournisseur/details-bon-retour-fournisseur.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListBonRetourFournisseurComponent
      },
      {
        path: 'ajout',
        component: AjoutBonRetourFournisseurComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierBonRetourFournisseurComponent
      },
      {
        path: 'details/:id',
        component: DetailsBonRetourFournisseurComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BonretourfournisseurRoutingModule { }
