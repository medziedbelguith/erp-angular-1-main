import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsCorrectionStockComponent } from './details-correction-stock.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsCorrectionStockComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DetailsCorrectionStockRoutingModule { }
