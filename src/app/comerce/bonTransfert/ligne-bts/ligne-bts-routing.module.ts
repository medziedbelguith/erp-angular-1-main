import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LigneBTsComponent } from './ligne-bts.component';

const routes: Routes = [
  {
    path: '',
    component: LigneBTsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LigneBtsRoutingModule { }
