import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutTypeContactComponent } from './ajout-type-contact.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutTypeContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutTypeContactRoutingModule { }
