import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VariantesComponent } from './variantes.component';

const routes: Routes = [
  {
    path: '',
    component: VariantesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class variantesRoutingModule { }
