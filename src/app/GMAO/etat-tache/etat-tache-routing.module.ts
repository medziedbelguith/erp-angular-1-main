import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtatTacheComponent } from './etat-tache.component';

const routes: Routes = [
  {
    path: '',
    component: EtatTacheComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtatTacheRoutingModule { }
