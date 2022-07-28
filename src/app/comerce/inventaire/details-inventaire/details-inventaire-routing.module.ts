import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsInventaireComponent } from './details-inventaire.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsInventaireComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DetailsInventaireRoutingModule { }
