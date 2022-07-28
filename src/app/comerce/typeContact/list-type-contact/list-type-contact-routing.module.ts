import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTypeContactComponent } from './list-type-contact.component';

const routes: Routes = [
  {
    path: '',
    component: ListTypeContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListTypeContactRoutingModule { }
