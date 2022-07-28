import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTypeTierComponent } from './list-type-tier.component';

const routes: Routes = [
  {
    path: '',
    component: ListTypeTierComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListTypeTierRoutingModule { }
