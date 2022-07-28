import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadChildren: () => import('./list-charge-directe/list-charge-directe.module').then(module => module.ListChargeDirecteModule)
      },
      {
        path: 'ajout',
        loadChildren: () => import('./ajout-charge-directe/ajout-charge-directe.module').then(module => module.AjoutChargeDirecteModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChargeDirecteRoutingModule { }
