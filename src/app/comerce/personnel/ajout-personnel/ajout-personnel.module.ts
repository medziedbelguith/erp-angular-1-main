import { AjoutPersonnelComponent } from './ajout-personnel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjoutPersonnelRoutingModule } from './ajout-personnel-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SharedGlobalModule } from 'src/app/shared-global/shared-global.module';

@NgModule({
  declarations: [AjoutPersonnelComponent],
  imports: [
    CommonModule,
    AjoutPersonnelRoutingModule,
    SharedGlobalModule,
    SharedModule,
  ],
  exports:[AjoutPersonnelComponent]
})
export class AjoutPersonnelModule { }
