import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierCorrectionStockComponent } from './modifier-correction-stock.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierCorrectionStockComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierCorrectionStockRoutingModule { }
