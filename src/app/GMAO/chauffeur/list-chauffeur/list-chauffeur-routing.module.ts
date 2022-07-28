import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListChauffeurComponent } from './list-chauffeur.component';

const routes: Routes = [
  {
    path: '',
    component: ListChauffeurComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListChauffeurRoutingModule { }
