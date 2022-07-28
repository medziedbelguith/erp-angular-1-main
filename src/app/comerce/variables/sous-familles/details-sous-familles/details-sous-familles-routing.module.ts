import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DetailsSousFamillesComponent } from './details-sous-familles.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsSousFamillesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsSousFamillesRoutingModule { }
