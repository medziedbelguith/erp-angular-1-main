import { LigneBTravailsComponent } from './ligne-btravails/ligne-btravails.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsBonTravailComponent } from './details-bon-travail/details-bon-travail.component';
import { ModifierBonTravailComponent } from './modifier-bon-travail/modifier-bon-travail.component';
import { AjoutBonTravailComponent } from './ajout-bon-travail/ajout-bon-travail.component';
import { ListBonTravailComponent } from './list-bon-travail/list-bon-travail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListBonTravailComponent
      },
      {
        path: 'ajout',
        component: AjoutBonTravailComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierBonTravailComponent
      },
      {
        path: 'details/:id',
        component: DetailsBonTravailComponent
      },
      {
        path: 'ligneBTs',
        component: LigneBTravailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonTravailRoutingModule { }
