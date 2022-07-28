import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTachePreventifComponent } from './list-tache-preventif.component';

const routes: Routes = [
  {
    path: '',
    component: ListTachePreventifComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListTachePreventifRoutingModule { }
