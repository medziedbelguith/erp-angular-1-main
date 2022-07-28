import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifierSecteurComponent } from './modifier-secteur.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierSecteurComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ModifierSecteurRoutingModule { }
