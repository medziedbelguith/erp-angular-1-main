import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LigneBTravailsComponent } from './ligne-btravails.component';

const routes: Routes = [
  {
    path: '',
    component: LigneBTravailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LigneBtravailsRoutingModule { }
