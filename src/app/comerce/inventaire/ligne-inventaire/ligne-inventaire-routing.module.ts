import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LigneInventaireComponent } from './ligne-inventaire.component';
const routes: Routes = [
  {
    path: '',
    component: LigneInventaireComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LigneInventaireRoutingModule { }
