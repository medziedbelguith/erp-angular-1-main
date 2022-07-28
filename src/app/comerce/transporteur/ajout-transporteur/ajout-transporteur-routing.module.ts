import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutTransporteurComponent } from './ajout-transporteur.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutTransporteurComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AjoutTransporteurRoutingModule { }
