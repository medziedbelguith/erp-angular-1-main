import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeCompteComponent } from './type-compte.component';

const routes: Routes = [
  {
    path: '',
    component: TypeCompteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeCompteRoutingModule { }
