import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutTypeTierComponent } from './ajout-type-tier.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutTypeTierComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutTypeTierRoutingModule { }
