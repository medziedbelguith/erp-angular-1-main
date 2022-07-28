import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LigneCorrectionStocksComponent } from './ligne-correction-stocks.component';

const routes: Routes = [
  {
    path: '',
    component: LigneCorrectionStocksComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LigneCorrectionStocksRoutingModule { }
