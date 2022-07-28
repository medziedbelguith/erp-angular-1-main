import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsTauxTvaComponent } from './details-taux-tva.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsTauxTvaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsTauxTvaRoutingModule { }
