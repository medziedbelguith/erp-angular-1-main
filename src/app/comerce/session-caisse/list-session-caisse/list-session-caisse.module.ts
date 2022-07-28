import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ListSessionCaisseRoutingModule } from './list-session-caisse-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListSessionCaisseRoutingModule,
    SharedModule,
  ]
})
export class ListSessionCaisseModule { }
