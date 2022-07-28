import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPersonnelComponent } from './list-personnel.component';

const routes: Routes = [
  {
    path: '',
    component: ListPersonnelComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListPersonnelRoutingModule { }
