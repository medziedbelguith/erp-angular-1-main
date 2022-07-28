import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListRoleComponent } from './list-role/list-role.component';
import { AjouterRoleComponent } from './ajouter-role/ajouter-role.component';
import { ModifierRoleComponent } from './modifier-role/modifier-role.component';
import { DetailsArticleComponent } from 'src/app/comerce/article/details-article/details-article.component';
import { DetailsRoleComponent } from './details-role/details-role.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListRoleComponent
      },
      {
        path: 'ajout',
        component: AjouterRoleComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierRoleComponent
      },
      {
        path: 'details/:id',
        component: DetailsRoleComponent
      }
      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
