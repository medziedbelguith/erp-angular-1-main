import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifierSocieteComponent } from './modifier-societe.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierSocieteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierSocieteRoutingModule { }
