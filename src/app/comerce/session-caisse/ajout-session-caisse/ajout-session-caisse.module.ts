import { AjoutSessionCaisseComponent } from './ajout-session-caisse.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AjoutSessionCaisseRoutingModule } from './ajout-session-caisse-routing.module';
import { SharedGlobalModule } from 'src/app/shared-global/shared-global.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AjoutSessionCaisseRoutingModule,
    SharedModule,
    SharedGlobalModule,
  ]
})
export class AjoutSessionCaisseModule { }
