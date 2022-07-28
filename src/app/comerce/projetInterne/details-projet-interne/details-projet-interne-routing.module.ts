import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsProjetInterneComponent } from './details-projet-interne.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsProjetInterneComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsProjetInterneRoutingModule { }
