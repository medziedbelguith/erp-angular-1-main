import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSecteurComponent } from './list-secteur.component';

const routes: Routes = [
  {
    path: '',
    component: ListSecteurComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ListSecteurRoutingModule { }
