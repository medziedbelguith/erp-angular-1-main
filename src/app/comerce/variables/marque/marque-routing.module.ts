import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ajout',
        loadChildren: () => import('./ajout-marque/ajout-marque.module').then(module => module.AjoutMarqueModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./list-marque/list-marque.module').then(module => module.ListMarqueModule)
      },
      {
        path: 'modifier/:id',
        loadChildren: () => import('./modifier-marque/modifier-marque.module').then(module => module.ModifierMarqueModule)
      },
      {
        path: 'details/:id',
        loadChildren: () => import('./details-marque/details-marque.module').then(module => module.DetailsMarqueModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MarqueRoutingModule { }
