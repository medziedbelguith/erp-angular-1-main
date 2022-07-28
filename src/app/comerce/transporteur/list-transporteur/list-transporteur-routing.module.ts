import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTransporteurComponent } from './list-transporteur.component';

const routes: Routes = [
  {
    path: '',
    component: ListTransporteurComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListTransporteurRoutingModule { }
