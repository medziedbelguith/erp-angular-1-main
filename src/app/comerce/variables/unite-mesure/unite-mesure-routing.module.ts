import { ModifierUniteMesureComponent } from './modifier-unite-mesure/modifier-unite-mesure.component';
import { AjoutUniteMesureComponent } from './ajout-unite-mesure/ajout-unite-mesure.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUniteMesureComponent } from './list-unite-mesure/list-unite-mesure.component';
import { DetailsUniteMesureComponent } from './details-unite-mesure/details-unite-mesure.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListUniteMesureComponent
      },
      {
        path: 'ajout',
        component: AjoutUniteMesureComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierUniteMesureComponent
      },
      {
        path: 'details/:id',
        component: DetailsUniteMesureComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniteMesureRoutingModule { }
