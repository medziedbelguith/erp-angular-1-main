import { DetailsModeReglementComponent } from './details-mode-reglement/details-mode-reglement.component';
import { ModifierModeReglementComponent } from './modifier-mode-reglement/modifier-mode-reglement.component';
import { AjoutModeReglementComponent } from './ajout-mode-reglement/ajout-mode-reglement.component';
import { ListModeReglementComponent } from './list-mode-reglement/list-mode-reglement.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListModeReglementComponent
      },
      {
        path: 'ajout',
        component: AjoutModeReglementComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierModeReglementComponent
      },
      {
        path: 'details/:id',
        component: DetailsModeReglementComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeReglementRoutingModule { }
