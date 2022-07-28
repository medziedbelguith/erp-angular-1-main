import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutChargeSocieteComponent } from './ajout-charge-societe.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutChargeSocieteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutChargeSocieteRoutingModule { }
