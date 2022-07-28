import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPlanPreventifComponent } from './list-plan-preventif.component';

const routes: Routes = [
  {
    path: '',
    component: ListPlanPreventifComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListPlanPreventifRoutingModule { }
