import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DetailsBonPrelevementComponent } from './details-bon-prelevement.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsBonPrelevementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsBonPrelevementRoutingModule { }
