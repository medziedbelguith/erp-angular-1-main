import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifierSousFamillesComponent } from './modifier-sous-familles.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierSousFamillesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierSousFamillesRoutingModule { }
