import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MouvementStockComponent } from './mouvement-stock.component';

const routes: Routes = [
  {
    path: '',
    component: MouvementStockComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MouvementStockRoutingModule { }
