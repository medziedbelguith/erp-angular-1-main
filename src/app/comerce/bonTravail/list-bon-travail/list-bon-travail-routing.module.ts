import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListBonTravailComponent } from './list-bon-travail.component';

const routes: Routes = [
  {
    path: '',
    component: ListBonTravailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListBonTravailRoutingModule { }
