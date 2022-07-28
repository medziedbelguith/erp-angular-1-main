import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarqueMachineComponent } from './marque-machine.component';

const routes: Routes = [
  {
    path: '',
    component: MarqueMachineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarqueMachineRoutingModule { }
