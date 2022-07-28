import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutProjetInterneComponent } from './ajout-projet-interne.component';


const routes: Routes = [
  {
    path: '',
    component:  AjoutProjetInterneComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutProjetInterneRoutingModule { }
