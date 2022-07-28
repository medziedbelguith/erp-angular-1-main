import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BonLivrasonRoutingModule } from './bon-livrason-routing.module';
import { FiltreDateComponent } from '../../shared-global/filtre-date/filtre-date.component';
import { ReglementsBonLivraisonComponent } from './reglements-bon-livraison/reglements-bon-livraison.component';
import { ChargeGlobalComponent } from './charge-global/charge-global.component';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { ChargeDetailsComponent } from './charge-details/charge-details.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BonLivrasonRoutingModule,
    SharedModule,
  ]
})
export class BonLivrasonModule { }
