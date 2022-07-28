import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTypeFraisComponent } from './list-type-frais.component';

const routes: Routes = [
  {
    path: '',
    component: ListTypeFraisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListTypeFraisRoutingModule { }
