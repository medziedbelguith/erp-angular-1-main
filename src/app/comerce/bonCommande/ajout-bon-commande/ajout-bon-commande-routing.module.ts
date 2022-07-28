import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutBonCommandeComponent } from './ajout-bon-commande.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutBonCommandeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutBonCommandeRoutingModule { }
