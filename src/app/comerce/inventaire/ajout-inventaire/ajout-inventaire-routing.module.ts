import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutInventaireComponent } from './ajout-inventaire.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutInventaireComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutInventaireRoutingModule { }
