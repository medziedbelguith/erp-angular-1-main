import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierInventaireComponent } from './modifier-inventaire.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierInventaireComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierInventaireRoutingModule { }
