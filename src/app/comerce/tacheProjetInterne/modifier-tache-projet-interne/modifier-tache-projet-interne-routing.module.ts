import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierTacheProjetInterneComponent } from './modifier-tache-projet-interne.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierTacheProjetInterneComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierTacheProjetInterneRoutingModule { }
