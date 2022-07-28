import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListBonTransfertComponent } from './list-bon-transfert.component';

const routes: Routes = [
  {
    path: '',
    component: ListBonTransfertComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListBonTransfertRoutingModule { }
