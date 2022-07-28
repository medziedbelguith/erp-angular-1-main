import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutBonTravailComponent } from './ajout-bon-travail.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutBonTravailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutBonTravailRoutingModule { }
