import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsTacheProjetInterneComponent } from './details-tache-projet-interne.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsTacheProjetInterneComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsTacheProjetInterneRoutingModule { }
