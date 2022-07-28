import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ModifierBonTravailComponent } from './modifier-bon-travail.component';

const routes: Routes = [
  {
    path: '',
    component:  ModifierBonTravailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierBonTravailRoutingModule { }
