import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCommandeComponent } from './list-commande/list-commande.component';
import { AjoutCommandeComponent } from './ajout-commande/ajout-commande.component';
import { ModifierCommandeComponent } from './modifier-commande/modifier-commande.component';
import { DetailsCommandeComponent } from './details-commande/details-commande.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListCommandeComponent
      },
      {
        path: 'ajout',
        component: AjoutCommandeComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierCommandeComponent
      },
      {
        path: 'details/:id',
        component: DetailsCommandeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CommandeRoutingModule { }
