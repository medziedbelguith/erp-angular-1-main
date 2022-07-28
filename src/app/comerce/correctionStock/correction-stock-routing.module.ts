import { LigneCorrectionStocksComponent } from './ligne-correction-stocks/ligne-correction-stocks.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutCorrectionStockComponent } from './ajout-correction-stock/ajout-correction-stock.component';
import { DetailsCorrectionStockComponent } from './details-correction-stock/details-correction-stock.component';
import { ListCorrectionStockComponent } from './list-correction-stock/list-correction-stock.component';
import { ModifierCorrectionStockComponent } from './modifier-correction-stock/modifier-correction-stock.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListCorrectionStockComponent
      },
      {
        path: 'ajout',
        component: AjoutCorrectionStockComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierCorrectionStockComponent
      },
      {
        path: 'ligneInventaire',
        component: LigneCorrectionStocksComponent
      },
      {
        path: 'details/:id',
        component: DetailsCorrectionStockComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorrectionStockRoutingModule { }
