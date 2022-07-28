import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChargeModeReglComponent } from './charge-mode-regl.component';

const routes: Routes = [
  {
    path: '',
    component: ChargeModeReglComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChargeModeReglRoutingModule { }
