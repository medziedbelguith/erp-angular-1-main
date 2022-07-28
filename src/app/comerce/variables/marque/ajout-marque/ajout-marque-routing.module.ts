import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutMarqueComponent } from './ajout-marque.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutMarqueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AjoutMarqueRoutingModule { }
