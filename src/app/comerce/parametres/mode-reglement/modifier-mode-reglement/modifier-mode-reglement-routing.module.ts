import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifierModeReglementComponent } from './modifier-mode-reglement.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierModeReglementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierModeReglementRoutingModule { }
