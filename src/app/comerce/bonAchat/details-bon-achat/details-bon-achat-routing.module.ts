import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsBonAchatComponent } from './details-bon-achat.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsBonAchatComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsBonAchatRoutingModule { }
