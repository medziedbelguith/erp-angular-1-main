import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReglementsCaisseComponent } from './reglements-caisse.component';

const routes: Routes = [
  {
    path: '',
    component: ReglementsCaisseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReglementsCaisseRoutingModule { }
