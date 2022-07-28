import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ajout',
        loadChildren: () => import('./ajout-secteur/ajout-secteur.module').then(module => module.AjoutSecteurModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./list-secteur/list-secteur.module').then(module => module.ListSecteurModule)
      },
      {
        path: 'modifier/:id',
        loadChildren: () => import('./modifier-secteur/modifier-secteur.module').then(module => module.ModifierSecteurModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecteurRoutingModule { }
