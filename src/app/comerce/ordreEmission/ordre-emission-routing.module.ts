import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ajout',
        loadChildren: () => import('./ajout-ordre-emission/ajout-ordre-emission.module').then(module => module.AjoutOrdreEmissionModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./list-ordre-emission/list-ordre-emission.module').then(module => module.ListOrdreEmissionModule)
      },
      {
        path: 'modifier/:id',
        loadChildren: () => import('./modifier-ordre-emission/modifier-ordre-emission.module').then(module => module.ModifierOrdreEmissionModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdreEmissionRoutingModule { }
