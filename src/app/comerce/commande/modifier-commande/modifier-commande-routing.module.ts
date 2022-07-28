import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierCommandeComponent } from './modifier-commande.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierCommandeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierCommandeRoutingModule { }
