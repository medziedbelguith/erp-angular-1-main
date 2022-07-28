import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsTechnicienComponent } from './details-technicien.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsTechnicienComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsTechnicienRoutingModule { }
