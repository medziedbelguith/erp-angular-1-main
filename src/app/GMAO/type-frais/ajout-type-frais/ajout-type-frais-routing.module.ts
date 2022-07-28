import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutTypeFraisComponent } from './ajout-type-frais.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutTypeFraisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutTypeFraisRoutingModule { }
