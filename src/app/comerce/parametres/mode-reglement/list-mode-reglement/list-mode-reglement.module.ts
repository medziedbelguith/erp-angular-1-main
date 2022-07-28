import { ListModeReglementRoutingModule } from './list-mode-reglement-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListModeReglementRoutingModule,
    SharedModule
  ]
})
export class ListModeReglementModule { }
