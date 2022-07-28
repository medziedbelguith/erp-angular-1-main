import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierDevisComponent } from './modifier-devis.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierDevisComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierDevisRoutingModule { }
