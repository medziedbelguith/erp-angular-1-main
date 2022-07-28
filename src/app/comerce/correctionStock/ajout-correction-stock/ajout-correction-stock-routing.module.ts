import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutCorrectionStockComponent } from './ajout-correction-stock.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutCorrectionStockComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutCorrectionStockRoutingModule { }
