import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListModeleComponent } from './list-modele.component';

const routes: Routes = [
  {
    path: '',
    component: ListModeleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ListModeleRoutingModule { }
