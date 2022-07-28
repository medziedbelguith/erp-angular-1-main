import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifierPlanPreventifComponent } from './modifier-plan-preventif.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierPlanPreventifComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierPlanPreventifRoutingModule { }
