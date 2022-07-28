import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ajout',
        loadChildren: () => import('./ajout-modele/ajout-modele.module').then(module => module.AjoutModeleModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./list-modele/list-modele.module').then(module => module.ListModeleModule)
      },
      {
        path: 'modifier/:id',
        loadChildren: () => import('./modifier-modele/modifier-modele.module').then(module => module.ModifierModeleModule)
      },
      {
        path: 'details/:id',
        loadChildren: () => import('./details-modele/details-modele.module').then(module => module.DetailsModeleModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ModeleRoutingModule { }
