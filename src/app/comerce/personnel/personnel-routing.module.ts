import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutPersonnelComponent } from './ajout-personnel/ajout-personnel.component';
import { DetailsPersonnelComponent } from './details-personnel/details-personnel.component';
import { ListPersonnelComponent } from './list-personnel/list-personnel.component';
import { ModifierPersonnelComponent } from './modifier-personnel/modifier-personnel.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListPersonnelComponent
      },
      {
        path: 'ajout',
        component: AjoutPersonnelComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierPersonnelComponent
      },
      {
        path: 'details/:id',
        component: DetailsPersonnelComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelRoutingModule { }
