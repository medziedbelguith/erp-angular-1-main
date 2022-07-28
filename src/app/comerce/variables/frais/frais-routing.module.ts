import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ajout',
        loadChildren: () => import('./ajout-frais/ajout-frais.module').then(module => module.AjoutFraisModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./list-frais/list-frais.module').then(module => module.ListFraisModule)
      },
      {
        path: 'modifier/:id',
        loadChildren: () => import('./modifier-frais/modifier-frais.module').then(module => module.ModifierFraisModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FraisRoutingModule { }
