import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardViewComponent } from './components/board-view/board-view.component';

const routes: Routes = [
  { path: '', component: BoardsPageComponent },
  { path: ':id', component: BoardViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule {}
