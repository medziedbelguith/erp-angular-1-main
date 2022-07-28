import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsModeReglementComponent } from './details-mode-reglement.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsModeReglementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsModeReglementRoutingModule { }
