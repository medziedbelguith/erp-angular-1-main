import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ajout',
        loadChildren: () => import('./ajout-session-caisse/ajout-session-caisse.module').then(module => module.AjoutSessionCaisseModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./list-session-caisse/list-session-caisse.module').then(module => module.ListSessionCaisseModule)
      },
      {
        path: 'modifier/:id',
        loadChildren: () => import('./modifier-session-caisse/modifier-session-caisse.module').then(module => module.ModifierSessionCaisseModule)
      },
      {
        path: 'reglements',
        loadChildren: () => import('./reglements-caisse/reglements-caisse.module').then(module => module.ReglementsCaisseModule)
      },
      {
        path: 'chargeModReg',
        loadChildren: () => import('./charge-mode-regl/charge-mode-regl.module').then(module => module.ChargeModeReglModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionCaisseRoutingModule { }
