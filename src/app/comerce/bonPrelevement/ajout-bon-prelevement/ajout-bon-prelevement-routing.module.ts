import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutBonPrelevementComponent } from './ajout-bon-prelevement.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutBonPrelevementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutBonPrelevementRoutingModule { }
