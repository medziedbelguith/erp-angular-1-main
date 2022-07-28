import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ReglementsCaisseRoutingModule } from './reglements-caisse-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReglementsCaisseRoutingModule,
    SharedModule,
  ]
})
export class ReglementsCaisseModule { }
