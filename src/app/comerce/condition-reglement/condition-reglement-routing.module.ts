import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConditionReglementComponent } from './condition-reglement.component';

const routes: Routes = [
  {
    path: '',
    component: ConditionReglementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConditionReglementRoutingModule { }
