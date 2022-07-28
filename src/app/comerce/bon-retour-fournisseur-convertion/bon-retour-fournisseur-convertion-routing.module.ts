import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BonRetourFournisseurConvertionComponent } from './bon-retour-fournisseur-convertion.component';

const routes: Routes = [
  {
    path: '',
    component: BonRetourFournisseurConvertionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonRetourFournisseurConvertionRoutingModule { }