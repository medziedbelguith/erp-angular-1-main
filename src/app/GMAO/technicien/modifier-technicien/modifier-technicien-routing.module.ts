import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierTechnicienComponent } from './modifier-technicien.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierTechnicienComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierTechnicienRoutingModule { }
