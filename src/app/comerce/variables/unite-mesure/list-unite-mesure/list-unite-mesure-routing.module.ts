import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUniteMesureComponent } from './list-unite-mesure.component';

const routes: Routes = [
  {
    path: '',
    component: ListUniteMesureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListUniteMesureRoutingModule { }
