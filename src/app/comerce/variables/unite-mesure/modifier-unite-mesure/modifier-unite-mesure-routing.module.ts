import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifierUniteMesureComponent } from './modifier-unite-mesure.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierUniteMesureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierUniteMesureRoutingModule { }
