import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutBonTransfertComponent } from './ajout-bon-transfert.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutBonTransfertComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutBonTransfertRoutingModule { }
