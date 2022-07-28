import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierBonAchatComponent } from './modifier-bon-achat.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierBonAchatComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierBonAchatRoutingModule { }
