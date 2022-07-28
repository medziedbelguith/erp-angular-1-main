import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMarqueComponent } from './list-marque.component';

const routes: Routes = [
  {
    path: '',
    component: ListMarqueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ListMarqueRoutingModule { }
