import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutCommandeComponent } from './ajout-commande.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutCommandeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutCommandeRoutingModule { }
