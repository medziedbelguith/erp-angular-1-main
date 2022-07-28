import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsRoleComponent } from './details-role.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsRoleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoleRoutingModule { }
