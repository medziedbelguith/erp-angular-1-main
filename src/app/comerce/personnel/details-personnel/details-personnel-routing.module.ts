import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsPersonnelComponent } from './details-personnel.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsPersonnelComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsPersonnelRoutingModule { }
