import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifierTachePreventifComponent } from './modifier-tache-preventif.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierTachePreventifComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierTachePreventifRoutingModule { }
