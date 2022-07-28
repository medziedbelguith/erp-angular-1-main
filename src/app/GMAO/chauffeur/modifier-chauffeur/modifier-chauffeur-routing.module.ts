import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierChauffeurComponent } from './modifier-chauffeur.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierChauffeurComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierChauffeurRoutingModule { }
