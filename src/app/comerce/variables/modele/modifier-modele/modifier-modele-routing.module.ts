import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifierModeleComponent } from './modifier-modele.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierModeleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierModeleRoutingModule { }
