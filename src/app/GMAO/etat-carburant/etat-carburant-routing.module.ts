import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtatCarburantComponent } from './etat-carburant.component';

const routes: Routes = [
  {
    path: '',
    component: EtatCarburantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtatCarburantRoutingModule { }
