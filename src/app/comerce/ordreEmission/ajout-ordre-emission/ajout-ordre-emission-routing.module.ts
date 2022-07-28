import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutOrdreEmissionComponent } from './ajout-ordre-emission.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutOrdreEmissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutOrdreEmissionRoutingModule { }
