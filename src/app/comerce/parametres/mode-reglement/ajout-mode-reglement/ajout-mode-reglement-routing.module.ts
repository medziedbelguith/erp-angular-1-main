import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutModeReglementComponent } from './ajout-mode-reglement.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutModeReglementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutModeReglementRoutingModule { }
