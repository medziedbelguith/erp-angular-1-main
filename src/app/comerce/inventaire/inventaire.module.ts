import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { InventaireRoutingModule } from './inventaire-routing.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    InventaireRoutingModule
  ]
})
export class InventaireModule { }
