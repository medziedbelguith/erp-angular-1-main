import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutTacheProjetInterneComponent } from './ajout-tache-projet-interne.component';


const routes: Routes = [
  {
    path: '',
    component:  AjoutTacheProjetInterneComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutTacheProjetInterneRoutingModule { }
