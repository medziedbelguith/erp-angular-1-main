import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsDevisComponent } from './details-devis.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsDevisComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsDevisRoutingModule { }
