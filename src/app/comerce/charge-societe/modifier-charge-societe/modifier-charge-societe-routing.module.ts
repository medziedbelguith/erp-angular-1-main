import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifierChargeSocieteComponent } from './modifier-charge-societe.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierChargeSocieteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierChargeSocieteRoutingModule { }
