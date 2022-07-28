import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutTechnicienComponent } from './ajout-technicien.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutTechnicienComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutTechnicienRoutingModule { }
