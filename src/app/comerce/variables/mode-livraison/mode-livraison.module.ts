import { ModeLivraisonRoutingModule } from './mode-livraison-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModeLivraisonRoutingModule,
    SharedModule,
  ]
})
export class ModeLivraisonModule { }
