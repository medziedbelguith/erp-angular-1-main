import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutChargeDirecteComponent } from './ajout-charge-directe.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutChargeDirecteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutChargeDirecteRoutingModule { }
