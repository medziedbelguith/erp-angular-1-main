import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutBonAchatComponent } from './ajout-bon-achat.component';


const routes: Routes = [
  {
    path: '',
    component: AjoutBonAchatComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutBonAchatRoutingModule { }
