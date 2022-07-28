import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutUtilisateurComponent } from './Components/ajout-utilisateur/ajout-utilisateur.component';
import { DetailsUtilisateurComponent } from './Components/details-utilisateur/details-utilisateur.component';
import { ListUtilisateurComponent } from './Components/list-utilisateur/list-utilisateur.component';
import { ModifierUtilisateurComponent } from './Components/modifier-utilisateur/modifier-utilisateur.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListUtilisateurComponent
      },
      {
        path: 'ajout',
        component: AjoutUtilisateurComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierUtilisateurComponent
      },
      {
        path: 'details/:id',
        component: DetailsUtilisateurComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateurRoutingModule { }
