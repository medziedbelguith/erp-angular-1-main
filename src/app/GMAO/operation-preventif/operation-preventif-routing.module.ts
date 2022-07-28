import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationPreventifComponent } from './operation-preventif.component';

const routes: Routes = [
  {
    path: '',
    component:  OperationPreventifComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationPreventifRoutingModule { }
