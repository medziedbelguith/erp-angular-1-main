import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ModifierModeLivraisonRoutingModule } from './modifier-mode-livraison-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModifierModeLivraisonRoutingModule,
    SharedModule
  ]
})
export class ModifierModeLivraisonModule { }
