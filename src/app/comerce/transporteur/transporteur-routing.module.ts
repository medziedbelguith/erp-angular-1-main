import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutTransporteurComponent } from './ajout-transporteur/ajout-transporteur.component';
import { ListTransporteurComponent } from './list-transporteur/list-transporteur.component';
import { ModifierTransporteurComponent } from './modifier-transporteur/modifier-transporteur.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListTransporteurComponent
      },
      {
        path: 'ajout',
        component: AjoutTransporteurComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierTransporteurComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransporteurRoutingModule { }
