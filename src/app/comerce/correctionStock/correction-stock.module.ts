import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorrectionStockRoutingModule } from './correction-stock-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CorrectionStockHtmlComponent } from './correction-stock-html/correction-stock-html.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CorrectionStockRoutingModule,
    SharedModule
  ]
})
export class CorrectionStockModule { }
