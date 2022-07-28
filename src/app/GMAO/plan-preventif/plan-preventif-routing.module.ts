import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutPlanPreventifComponent } from './ajout-plan-preventif/ajout-plan-preventif.component';
import { AlertTacheComponent } from './alert-tache/alert-tache.component';
import { DetailsPlanPreventifComponent } from './details-plan-preventif/details-plan-preventif.component';
import { ListPlanPreventifComponent } from './list-plan-preventif/list-plan-preventif.component';
import { ModifierPlanPreventifComponent } from './modifier-plan-preventif/modifier-plan-preventif.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListPlanPreventifComponent
      },
      {
        path: 'ajout',
        component: AjoutPlanPreventifComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierPlanPreventifComponent
      },
      {
        path: 'details/:id',
        component: DetailsPlanPreventifComponent
      },
      {
        path: 'alerte',
        component: AlertTacheComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanPreventifRoutingModule { }
