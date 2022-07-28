import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListBonCommandeComponent } from './list-bon-commande/list-bon-commande.component';
import { AjoutBonCommandeComponent } from './ajout-bon-commande/ajout-bon-commande.component';
import { ModifierBonCommandeComponent } from './modifier-bon-commande/modifier-bon-commande.component';
import { DetailsBonCommandeComponent } from './details-bon-commande/details-bon-commande.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListBonCommandeComponent
      },
      {
        path: 'ajout',
        component: AjoutBonCommandeComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierBonCommandeComponent
      },
      {
        path: 'details/:id',
        component: DetailsBonCommandeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoncommandeRoutingModule { }
