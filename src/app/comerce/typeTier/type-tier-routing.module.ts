import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutTypeTierComponent } from './components/ajout-type-tier/ajout-type-tier.component';
import { ListTypeTierComponent } from './components/list-type-tier/list-type-tier.component';
import { ModifierTypeTierComponent } from './components/modifier-type-tier/modifier-type-tier.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListTypeTierComponent
      },
      {
        path: 'ajout',
        component: AjoutTypeTierComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierTypeTierComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeTierRoutingModule { }
