import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutSessionCaisseComponent } from './ajout-session-caisse.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutSessionCaisseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutSessionCaisseRoutingModule { }
