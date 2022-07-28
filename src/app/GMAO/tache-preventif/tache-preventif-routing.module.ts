import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutTachePreventifComponent } from './ajout-tache-preventif/ajout-tache-preventif.component';
import { DetailsTachePreventifComponent } from './details-tache-preventif/details-tache-preventif.component';
import { ListTachePreventifComponent } from './list-tache-preventif/list-tache-preventif.component';
import { ModifierTachePreventifComponent } from './modifier-tache-preventif/modifier-tache-preventif.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListTachePreventifComponent
      },
      {
        path: 'ajout',
        component: AjoutTachePreventifComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierTachePreventifComponent
      },
      {
        path: 'details/:id',
        component: DetailsTachePreventifComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TachePreventifRoutingModule { }
