import { ListChargeSocieteComponent } from './list-charge-societe/list-charge-societe.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierChargeSocieteComponent } from './modifier-charge-societe/modifier-charge-societe.component';
import { AjoutChargeSocieteComponent } from './ajout-charge-societe/ajout-charge-societe.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListChargeSocieteComponent
      },
      {
        path: 'ajout',
        component: AjoutChargeSocieteComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierChargeSocieteComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChargeSocieteRoutingModule { }
