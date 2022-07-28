import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOrdreEmissionComponent } from './list-ordre-emission.component';

const routes: Routes = [
  {
    path: '',
    component: ListOrdreEmissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ListOrdreEmissionRoutingModule { }
