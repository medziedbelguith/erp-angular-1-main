import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifierTauxTvaComponent } from './modifier-taux-tva.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierTauxTvaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierTauxTvaRoutingModule { }
