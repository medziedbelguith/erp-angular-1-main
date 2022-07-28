import { DetailsTauxTvaComponent } from './details-taux-tva/details-taux-tva.component';
import { ModifierTauxTvaComponent } from './modifier-taux-tva/modifier-taux-tva.component';
import { AjoutTauxTvaComponent } from './ajout-taux-tva/ajout-taux-tva.component';
import { ListTauxTvaComponent } from './list-taux-tva/list-taux-tva.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListTauxTvaComponent
      },
      {
        path: 'ajout',
        component: AjoutTauxTvaComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierTauxTvaComponent
      },
      {
        path: 'details/:id',
        component: DetailsTauxTvaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TauxTvaRoutingModule { }
