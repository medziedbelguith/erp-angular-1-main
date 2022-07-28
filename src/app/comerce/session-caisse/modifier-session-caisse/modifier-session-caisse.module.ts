import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ModifierSessionCaisseRoutingModule } from './modifier-session-caisse-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModifierSessionCaisseRoutingModule,
    SharedModule,
  ]
})
export class ModifierSessionCaisseModule { }
