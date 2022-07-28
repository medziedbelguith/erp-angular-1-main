import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListModeReglementComponent } from './list-mode-reglement.component';

const routes: Routes = [
  {
    path: '',
    component: ListModeReglementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListModeReglementRoutingModule { }
