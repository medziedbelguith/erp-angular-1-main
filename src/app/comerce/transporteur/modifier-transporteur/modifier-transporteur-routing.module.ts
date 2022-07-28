import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierTransporteurComponent } from './modifier-transporteur.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierTransporteurComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierTransporteurRoutingModule { }
