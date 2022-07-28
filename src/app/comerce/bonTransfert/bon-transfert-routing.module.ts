import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutBonTransfertComponent } from './ajout-bon-transfert/ajout-bon-transfert.component';
import { DetailsBonTransfertComponent } from './details-bon-transfert/details-bon-transfert.component';
import { LigneBTsComponent } from './ligne-bts/ligne-bts.component';
import { ListBonTransfertComponent } from './list-bon-transfert/list-bon-transfert.component';
import { ModifierBonTransfertComponent } from './modifier-bon-transfert/modifier-bon-transfert.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListBonTransfertComponent
      },
      {
        path: 'ajout',
        component: AjoutBonTransfertComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierBonTransfertComponent
      },
      {
        path: 'details/:id',
        component: DetailsBonTransfertComponent
      },
      {
        path: 'ligneBTs',
        component: LigneBTsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonTransfertRoutingModule { }
