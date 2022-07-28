import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsMarqueComponent } from './details-marque.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsMarqueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DetailsMarqueRoutingModule { }
