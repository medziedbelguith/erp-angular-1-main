import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FraisMissionComponent } from './frais-mission.component';

const routes: Routes = [
  {
    path: '',
    component: FraisMissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FraisMissionRoutingModule { }
