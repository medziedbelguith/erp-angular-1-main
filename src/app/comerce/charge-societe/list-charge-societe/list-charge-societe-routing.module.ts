import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListChargeSocieteComponent } from './list-charge-societe.component';

const routes: Routes = [
  {
    path: '',
    component: ListChargeSocieteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListChargeSocieteRoutingModule { }
