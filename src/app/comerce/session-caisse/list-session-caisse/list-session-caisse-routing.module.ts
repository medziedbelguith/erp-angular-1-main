import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSessionCaisseComponent } from './list-session-caisse.component';

const routes: Routes = [
  {
    path: '',
    component: ListSessionCaisseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListSessionCaisseRoutingModule { }
