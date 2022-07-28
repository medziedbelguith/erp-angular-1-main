import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutDevisComponent } from './ajout-devis.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutDevisComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutDevisRoutingModule { }
