import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDevisComponent } from './list-devis/list-devis.component';
import { AjoutDevisComponent } from './ajout-devis/ajout-devis.component';
import { ModifierDevisComponent } from './modifier-devis/modifier-devis.component';
import { DetailsDevisComponent } from './details-devis/details-devis.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListDevisComponent
      },
      {
        path: 'ajout',
        component: AjoutDevisComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierDevisComponent
      },
      {
        path: 'details/:id',
        component: DetailsDevisComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DevisRoutingModule { }
