import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifierTypeContactComponent } from './modifier-type-contact.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierTypeContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierTypeContactRoutingModule { }
