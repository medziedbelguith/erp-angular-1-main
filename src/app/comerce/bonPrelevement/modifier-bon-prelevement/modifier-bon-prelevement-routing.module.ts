import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ModifierBonPrelevementComponent } from './modifier-bon-prelevement.component';

const routes: Routes = [
  {
    path: '',
    component:  ModifierBonPrelevementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierBonPrelevementRoutingModule { }
