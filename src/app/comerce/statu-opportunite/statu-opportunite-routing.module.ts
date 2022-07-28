import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatuOpportuniteComponent } from './statu-opportunite.component';

const routes: Routes = [
  {
    path: '',
    component: StatuOpportuniteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatuOpportuniteRoutingModule { }
