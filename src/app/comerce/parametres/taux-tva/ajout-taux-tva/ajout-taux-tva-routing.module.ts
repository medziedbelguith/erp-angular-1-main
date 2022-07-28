import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutTauxTvaComponent } from './ajout-taux-tva.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutTauxTvaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutTauxTvaRoutingModule { }
