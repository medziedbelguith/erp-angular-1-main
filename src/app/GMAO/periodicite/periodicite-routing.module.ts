import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodiciteComponent } from './periodicite.component';

const routes: Routes = [
  {
    path: '',
    component: PeriodiciteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodiciteRoutingModule { }
