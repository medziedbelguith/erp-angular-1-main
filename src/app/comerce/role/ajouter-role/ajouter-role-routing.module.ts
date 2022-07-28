import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterRoleComponent } from './ajouter-role.component';

const routes: Routes = [
  {
    path: '',
    component: AjouterRoleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjouterRoleRoutingModule { }
