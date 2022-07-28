import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BonLivraisonDevisConvertionComponent } from './bon-livraison-devis-convertion.component';

const routes: Routes = [
  {
    path: '',
    component: BonLivraisonDevisConvertionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonLivraisonDevisConvertionRoutingModule { }
