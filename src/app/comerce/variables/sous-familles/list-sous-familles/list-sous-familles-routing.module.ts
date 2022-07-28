import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSousFamillesComponent } from './list-sous-familles.component';

const routes: Routes = [
  {
    path: '',
    component: ListSousFamillesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListSousFamillesRoutingModule { }
