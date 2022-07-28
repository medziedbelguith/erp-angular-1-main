import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierFraisComponent } from './modifier-frais.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierFraisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierFraisRoutingModule { }
