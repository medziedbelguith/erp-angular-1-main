import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutModeleComponent } from './ajout-modele.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutModeleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AjoutModeleRoutingModule { }
