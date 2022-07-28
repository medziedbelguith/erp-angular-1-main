import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutSocieteComponent } from './ajout-societe.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutSocieteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutSocieteRoutingModule { }
