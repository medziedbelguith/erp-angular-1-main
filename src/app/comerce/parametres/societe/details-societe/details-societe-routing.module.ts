import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsSocieteComponent } from './details-societe.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsSocieteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsSocieteRoutingModule { }
