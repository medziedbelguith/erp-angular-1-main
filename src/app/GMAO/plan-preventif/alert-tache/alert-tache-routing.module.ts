import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertTacheComponent } from './alert-tache.component';

const routes: Routes = [
  {
    path: '',
    component: AlertTacheComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertTacheRoutingModule { }