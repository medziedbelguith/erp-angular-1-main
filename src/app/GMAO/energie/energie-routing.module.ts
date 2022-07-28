import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnergieComponent } from './energie.component';

const routes: Routes = [
  {
    path: '',
    component: EnergieComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnergieRoutingModule { }
