import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieMachineComponent } from './categorie-machine.component';

const routes: Routes = [
  {
    path: '',
    component: CategorieMachineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategorieMachineRoutingModule { }
