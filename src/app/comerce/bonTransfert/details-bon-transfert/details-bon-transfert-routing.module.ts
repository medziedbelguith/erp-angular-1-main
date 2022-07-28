import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DetailsBonTransfertComponent } from './details-bon-transfert.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsBonTransfertComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsBonTransfertRoutingModule { }
