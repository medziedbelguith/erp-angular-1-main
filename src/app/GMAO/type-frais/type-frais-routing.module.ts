import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadChildren: () => import('./list-type-frais/list-type-frais.module').then(module => module.ListTypeFraisModule)
      },
      {
        path: 'ajout',
        loadChildren: () => import('./ajout-type-frais/ajout-type-frais.module').then(module => module.AjoutTypeFraisModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeFraisRoutingModule { }
