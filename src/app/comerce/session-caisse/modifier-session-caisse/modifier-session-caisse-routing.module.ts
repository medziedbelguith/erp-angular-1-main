import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifierSessionCaisseComponent } from './modifier-session-caisse.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierSessionCaisseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierSessionCaisseRoutingModule { }
