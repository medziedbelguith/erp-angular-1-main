import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProjetInterneComponent } from './list-projet-interne.component';

const routes: Routes = [
  {
    path: '',
    component: ListProjetInterneComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListProjetInterneRoutingModule { }
