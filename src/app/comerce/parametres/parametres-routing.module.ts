import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'modeReglement',
        loadChildren: () => import('./mode-reglement/mode-reglement.module').then(module => module.ModeReglementModule)
      },
      {
        path: 'societe',
        loadChildren: () => import('./societe/societe.module').then(module => module.SocieteModule)
      },
      {
        path: 'tauxTVA',
        loadChildren: () => import('./taux-tva/taux-tva.module').then(module => module.TauxTvaModule)
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametresRoutingModule { }
