import { LigneInventaireComponent } from './ligne-inventaire/ligne-inventaire.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListInventaireComponent } from './list-inventaire/list-inventaire.component';
import { ModifierInventaireComponent } from './modifier-inventaire/modifier-inventaire.component';
import { AjoutInventaireComponent } from './ajout-inventaire/ajout-inventaire.component';
import { DetailsInventaireComponent } from './details-inventaire/details-inventaire.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListInventaireComponent
      },
      {
        path: 'ajout',
        component: AjoutInventaireComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierInventaireComponent
      },
      {
        path: 'ligneInventaire',
        component: LigneInventaireComponent
      },
      {
        path: 'details/:id',
        component: DetailsInventaireComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventaireRoutingModule { }
