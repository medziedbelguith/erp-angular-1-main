import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListChargeDirecteComponent } from './list-charge-directe.component';

const routes: Routes = [
  {
    path: '',
    component: ListChargeDirecteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListChargeDirecteRoutingModule { }
