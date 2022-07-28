import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListBonCommandeComponent } from './list-bon-commande.component';

const routes: Routes = [
  {
    path: '',
    component: ListBonCommandeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListBonCommandeRoutingModule { }
