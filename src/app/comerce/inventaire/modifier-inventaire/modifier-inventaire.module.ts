import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifierInventaireRoutingModule } from './modifier-inventaire-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModifierInventaireRoutingModule,
    SharedModule
  ]
})
export class ModifierInventaireModule { }
