import { ListFamillesComponent } from './list-familles/list-familles.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsFamillesComponent } from './details-familles/details-familles.component';
import { ModifierFamillesComponent } from './modifier-familles/modifier-familles.component';
import { AjoutFamillesComponent } from './ajout-familles/ajout-familles.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListFamillesComponent
      },
      {
        path: 'ajout',
        component: AjoutFamillesComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierFamillesComponent
      },
      {
        path: 'details/:id',
        component: DetailsFamillesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamillesRoutingModule { }
