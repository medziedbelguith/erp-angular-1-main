import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'categorieMachine',
        loadChildren: () => import('./categorie-machine/categorie-machine.module').then(module => module.CategorieMachineModule)
      },
      {
        path: 'modeleMachine',
        loadChildren: () => import('./modele-machine/modele-machine.module').then(module => module.ModeleMachineModule)
      },
      {
        path: 'marqueMachine',
        loadChildren: () => import('./marque-machine/marque-machine.module').then(module => module.MarqueMachineModule)
      },
      {
        path: 'operationPreventif',
        loadChildren: () => import('./operation-preventif/operation-preventif.module').then(module => module.OperationPreventifModule)
      },
      {
        path: 'energie',
        loadChildren: () => import('./energie/energie.module').then(module => module.EnergieModule)
      },
      {
        path: 'planPreventif',
        loadChildren: () => import('./plan-preventif/plan-preventif.module').then(module => module.PlanPreventifModule)
      },
      {
        path: 'machine',
        loadChildren: () => import('./machine/machine.module').then(module => module.MachineModule)
      },
      {
        path: 'periodicite',
        loadChildren: () => import('./periodicite/periodicite.module').then(module => module.PeriodiciteModule)
      },
      {
        path: 'tachePreventif',
        loadChildren: () => import('./tache-preventif/tache-preventif.module').then(module => module.TachePreventifModule)
      },
      {
        path: 'etatTache',
        loadChildren: () => import('./etat-tache/etat-tache.module').then(module => module.EtatTacheModule)
      },
      {
        path: 'etatCarburant',
        loadChildren: () => import('./etat-carburant/etat-carburant.module').then(module => module.EtatCarburantModule)
      },
      {
        path: 'technicien',
        loadChildren: () => import('./technicien/technicien.module').then(module => module.TechnicienModule)
      },
      {
        path: 'typeFrais',
        loadChildren: () => import('./type-frais/type-frais.module').then(module => module.TypeFraisModule)
      },
      {
        path: 'missions',
        loadChildren: () => import('./missions/mission.module').then(module => module.MissionModule)
      },
      {
        path: 'fraisMission',
        loadChildren: () => import('./frais-mission/frais-mission.module').then(module => module.FraisMissionModule)
      },
      {
        path: 'vehicule',
        loadChildren: () => import('./vehicule/vehicule.module').then(module => module.VehiculeModule)
      },
      {
        path: 'chauffeur',
        loadChildren: () => import('./chauffeur/chauffeur.module').then(module => module.ChauffeurModule)
      },
      {
        path: 'pointageCompteur',
        loadChildren: () => import('./pointage-compteur/pointage-compteur.module').then(module => module.PointageCompteurModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GmaoRoutingModule { }
