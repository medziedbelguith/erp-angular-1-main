import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListFraisComponent } from './list-frais.component';

const routes: Routes = [
  {
    path: '',
    component: ListFraisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListFraisRoutingModule { }
