import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsTachePreventifComponent } from './details-tache-preventif.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsTachePreventifComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsTachePreventifRoutingModule { }
