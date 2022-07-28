import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifierMarqueComponent } from './modifier-marque.component';

const routes: Routes = [
  {
    path: '',
    component:  ModifierMarqueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ModifierMarqueRoutingModule { }
