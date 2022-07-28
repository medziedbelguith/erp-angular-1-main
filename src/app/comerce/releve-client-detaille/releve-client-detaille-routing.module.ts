import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReleveClientDetailleComponent } from './releve-client-detaille.component';

const routes: Routes = [
  {
    path: '',
    component: ReleveClientDetailleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReleveClientDetailleRoutingModule { }
