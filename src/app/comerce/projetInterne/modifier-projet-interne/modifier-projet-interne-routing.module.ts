import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierProjetInterneComponent } from './modifier-projet-interne.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierProjetInterneComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierProjetInterneRoutingModule { }
