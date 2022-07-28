import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsModeleComponent } from './details-modele.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsModeleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DetailsModeleRoutingModule { }
