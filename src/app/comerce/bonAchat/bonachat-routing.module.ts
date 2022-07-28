import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListBonAchatComponent } from './list-bon-achat/list-bon-achat.component';
import { AjoutBonAchatComponent } from './ajout-bon-achat/ajout-bon-achat.component';
import { ModifierBonAchatComponent } from './modifier-bon-achat/modifier-bon-achat.component';
import { DetailsBonAchatComponent } from './details-bon-achat/details-bon-achat.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListBonAchatComponent
      },
      {
        path: 'ajout',
        component: AjoutBonAchatComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierBonAchatComponent
      },
      {
        path: 'details/:id',
        component: DetailsBonAchatComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonachatRoutingModule { }
