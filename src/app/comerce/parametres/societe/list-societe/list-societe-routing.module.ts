import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSocieteComponent } from './list-societe.component';

const routes: Routes = [
  {
    path: '',
    component: ListSocieteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListSocieteRoutingModule { }
