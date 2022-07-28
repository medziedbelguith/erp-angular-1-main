import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BonLivraisonCommandeConvertionComponent } from './bon-livraison-commande-convertion.component';

const routes: Routes = [
  {
    path: '',
    component: BonLivraisonCommandeConvertionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonLivraisonCommandeConvertionRoutingModule { }
