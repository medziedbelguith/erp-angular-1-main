import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutFraisComponent } from './ajout-frais.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutFraisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutFraisRoutingModule { }
