import { DetailsModeLivraisonComponent } from './details-mode-livraison/details-mode-livraison.component';
import { ModifierModeLivraisonComponent } from './modifier-mode-livraison/modifier-mode-livraison.component';
import { ListModeLivraisonComponent } from './list-mode-livraison/list-mode-livraison.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutModeLivraisonComponent } from './ajout-mode-livraison/ajout-mode-livraison.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListModeLivraisonComponent
      },
      {
        path: 'ajout',
        component: AjoutModeLivraisonComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierModeLivraisonComponent
      },
      {
        path: 'details/:id',
        component: DetailsModeLivraisonComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeLivraisonRoutingModule { }
