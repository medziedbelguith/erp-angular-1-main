import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTechnicienComponent } from './list-technicien.component';

const routes: Routes = [
  {
    path: '',
    component: ListTechnicienComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListTechnicienRoutingModule { }
