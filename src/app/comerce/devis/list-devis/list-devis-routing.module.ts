import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDevisComponent } from './list-devis.component';

const routes: Routes = [
  {
    path: '',
    component: ListDevisComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListDevisRoutingModule { }
