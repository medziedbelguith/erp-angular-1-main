import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierBonCommandeComponent } from './modifier-bon-commande.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierBonCommandeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierBonCommandeRoutingModule { }
