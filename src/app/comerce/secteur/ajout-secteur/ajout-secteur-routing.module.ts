import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutSecteurComponent } from './ajout-secteur.component';

const routes: Routes = [
  {
    path: '',
    component:  AjoutSecteurComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutSecteurRoutingModule { }
