import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierRoleComponent } from './modifier-role.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierRoleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierRoleRoutingModule { }
