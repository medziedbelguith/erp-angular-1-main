import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutMissionComponent } from './ajout-mission.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutMissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutMissionRoutingModule { }
