import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFamillesComponent } from './list-familles.component';

const routes: Routes = [
  {
    path: '',
    component: ListFamillesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListFamillesRoutingModule { }
