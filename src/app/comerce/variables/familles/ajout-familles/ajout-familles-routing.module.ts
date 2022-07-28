import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutFamillesComponent } from './ajout-familles.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutFamillesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutFamillesRoutingModule { }
