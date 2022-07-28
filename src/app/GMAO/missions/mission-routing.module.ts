import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadChildren: () => import('./list-mission/list-mission.module').then(module => module.ListMissionModule)
      },
      {
        path: 'ajout',
        loadChildren: () => import('./ajout-mission/ajout-mission.module').then(module => module.AjoutMissionModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionRoutingModule { }
