import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutTachePreventifComponent } from './ajout-tache-preventif.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutTachePreventifComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutTachePreventifRoutingModule { }
