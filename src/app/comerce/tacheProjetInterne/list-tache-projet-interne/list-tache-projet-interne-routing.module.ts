import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTacheProjetInterneComponent } from './list-tache-projet-interne.component';

const routes: Routes = [
  {
    path: '',
    component: ListTacheProjetInterneComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListTacheProjetInterneRoutingModule { }
