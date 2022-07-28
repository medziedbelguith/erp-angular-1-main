import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListBonPrelevementComponent } from './list-bon-prelevement.component';

const routes: Routes = [
  {
    path: '',
    component: ListBonPrelevementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListBonPrelevementRoutingModule { }
