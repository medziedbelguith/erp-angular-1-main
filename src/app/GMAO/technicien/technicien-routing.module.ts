import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutTechnicienComponent } from './ajout-technicien/ajout-technicien.component';
import { DetailsTechnicienComponent } from './details-technicien/details-technicien.component';
import { ListTechnicienComponent } from './list-technicien/list-technicien.component';
import { ModifierTechnicienComponent } from './modifier-technicien/modifier-technicien.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListTechnicienComponent
      },
      {
        path: 'ajout',
        component: AjoutTechnicienComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierTechnicienComponent
      },
      {
        path: 'details/:id',
        component: DetailsTechnicienComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicienRoutingModule { }
