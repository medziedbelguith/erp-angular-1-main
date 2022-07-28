import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NomenclatureComponent } from './nomenclature.component';

const routes: Routes = [
  {
    path: '',
    component: NomenclatureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NomenclatureRoutingModule { }
