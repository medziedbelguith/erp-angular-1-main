import { DetailsSocieteComponent } from './details-societe/details-societe.component';
import { ModifierSocieteComponent } from './modifier-societe/modifier-societe.component';
import { AjoutSocieteComponent } from './ajout-societe/ajout-societe.component';
import { ListSocieteComponent } from './list-societe/list-societe.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListSocieteComponent
      },
      {
        path: 'ajout',
        component: AjoutSocieteComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierSocieteComponent
      },
      {
        path: 'details/:id',
        component: DetailsSocieteComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocieteRoutingModule { }
