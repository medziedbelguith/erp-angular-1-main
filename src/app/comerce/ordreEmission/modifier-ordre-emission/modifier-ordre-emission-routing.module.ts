import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifierOrdreEmissionComponent } from './modifier-ordre-emission.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierOrdreEmissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierOrdreEmissionRoutingModule { }
