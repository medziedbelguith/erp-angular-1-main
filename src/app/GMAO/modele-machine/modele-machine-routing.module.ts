import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModeleMachineComponent } from './modele-machine.component';

const routes: Routes = [
  {
    path: '',
    component: ModeleMachineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeleMachineRoutingModule { }
