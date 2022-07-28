import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ModifierBonTransfertComponent } from './modifier-bon-transfert.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierBonTransfertComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierBonTransfertRoutingModule { }
