import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutPersonnelComponent } from './ajout-personnel.component';

const routes: Routes = [
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutPersonnelRoutingModule { }
