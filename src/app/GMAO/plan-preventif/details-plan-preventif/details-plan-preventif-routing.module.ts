import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsPlanPreventifComponent } from './details-plan-preventif.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsPlanPreventifComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsPlanPreventifRoutingModule { }
