import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBonPrelevementComponent } from './list-bon-prelevement/list-bon-prelevement.component';
import { AjoutBonPrelevementComponent } from './ajout-bon-prelevement/ajout-bon-prelevement.component';
import { ModifierBonPrelevementComponent } from './modifier-bon-prelevement/modifier-bon-prelevement.component';
import { DetailsBonPrelevementComponent } from './details-bon-prelevement/details-bon-prelevement.component';
import { LigneBPsComponent } from './ligne-bps/ligne-bps.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListBonPrelevementComponent
      },
      {
        path: 'ajout',
        component: AjoutBonPrelevementComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierBonPrelevementComponent
      },
      {
        path: 'details/:id',
        component: DetailsBonPrelevementComponent
      },
      {
        path: 'ligneBPs',
        component: LigneBPsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonPrelevementRoutingModule { }
