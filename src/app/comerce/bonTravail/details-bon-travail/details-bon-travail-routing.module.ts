import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DetailsBonTravailComponent } from './details-bon-travail.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsBonTravailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsBonTravailRoutingModule { }
