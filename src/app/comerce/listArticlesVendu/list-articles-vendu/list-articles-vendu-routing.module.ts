import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListArticlesVenduComponent } from './list-articles-vendu.component';

const routes: Routes = [
  {
    path: '',
    component: ListArticlesVenduComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListArticlesVenduRoutingModule { }
