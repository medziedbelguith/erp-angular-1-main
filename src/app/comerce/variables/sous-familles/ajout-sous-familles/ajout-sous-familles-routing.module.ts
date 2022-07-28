import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutSousFamillesComponent } from './ajout-sous-familles.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutSousFamillesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutSousFamillesRoutingModule { }
