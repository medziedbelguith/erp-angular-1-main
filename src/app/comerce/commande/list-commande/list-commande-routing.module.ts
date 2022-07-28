import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCommandeComponent } from './list-commande.component';

const routes: Routes = [
  {
    path: '',
    component: ListCommandeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListCommandeRoutingModule { }
