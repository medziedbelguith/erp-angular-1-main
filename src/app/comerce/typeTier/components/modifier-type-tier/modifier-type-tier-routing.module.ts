import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifierTypeTierComponent } from './modifier-type-tier.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierTypeTierComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierTypeTierRoutingModule { }
