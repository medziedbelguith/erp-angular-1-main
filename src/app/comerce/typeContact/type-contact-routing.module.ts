import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutTypeContactComponent } from './ajout-type-contact/ajout-type-contact.component';
import { ListTypeContactComponent } from './list-type-contact/list-type-contact.component';
import { ModifierTypeContactComponent } from './modifier-type-contact/modifier-type-contact.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListTypeContactComponent
      },
      {
        path: 'ajout',
        component: AjoutTypeContactComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierTypeContactComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeContactRoutingModule { }
