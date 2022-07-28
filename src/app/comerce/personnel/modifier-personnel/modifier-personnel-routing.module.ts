import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierPersonnelComponent } from './modifier-personnel.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierPersonnelComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierPersonnelRoutingModule { }
