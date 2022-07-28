import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMissionComponent } from './list-mission.component';

const routes: Routes = [
  {
    path: '',
    component: ListMissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListMissionRoutingModule { }
