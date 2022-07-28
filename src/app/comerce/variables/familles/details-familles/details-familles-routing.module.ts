import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsFamillesComponent } from './details-familles.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsFamillesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsFamillesRoutingModule { }
