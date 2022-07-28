import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BonRetourClientConvertionComponent } from './bon-retour-client-convertion.component';

const routes: Routes = [
  {
    path: '',
    component: BonRetourClientConvertionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonRetourClientConvertionRoutingModule { }