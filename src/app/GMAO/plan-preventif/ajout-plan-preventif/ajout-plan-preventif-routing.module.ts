import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutPlanPreventifComponent } from './ajout-plan-preventif.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutPlanPreventifComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutPlanPreventifRoutingModule { }
