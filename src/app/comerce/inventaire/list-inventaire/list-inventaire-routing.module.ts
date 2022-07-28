import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListInventaireComponent } from './list-inventaire.component';


const routes: Routes = [
  {
    path: '',
    component: ListInventaireComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListInventaireRoutingModule { }
