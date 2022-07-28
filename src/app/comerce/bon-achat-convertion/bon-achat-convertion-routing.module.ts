import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BonAchatConvertionComponent } from './bon-achat-convertion.component';

const routes: Routes = [
  {
    path: '',
    component: BonAchatConvertionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonAchatConvertionRoutingModule { }
