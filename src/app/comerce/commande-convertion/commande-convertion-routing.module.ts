import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommandeConvertionComponent } from './commande-convertion.component';

const routes: Routes = [
  {
    path: '',
    component: CommandeConvertionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandeConvertionRoutingModule { }
