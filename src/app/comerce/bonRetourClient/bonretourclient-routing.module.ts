import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListBonRetourClientComponent } from './list-bon-retour-client/list-bon-retour-client.component';
import { AjoutBonRetourClientComponent } from './ajout-bon-retour-client/ajout-bon-retour-client.component';
import { ModifierBonRetourClientComponent } from './modifier-bon-retour-client/modifier-bon-retour-client.component';
import { DetailsBonRetourClientComponent } from './details-bon-retour-client/details-bon-retour-client.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListBonRetourClientComponent
      },
      {
        path: 'ajout',
        component: AjoutBonRetourClientComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierBonRetourClientComponent
      },
      {
        path: 'details/:id',
        component: DetailsBonRetourClientComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BonretourclientRoutingModule { }
