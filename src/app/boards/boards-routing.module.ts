import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardViewComponent } from './components/board-view/board-view.component';
import { UserResolver } from '../auth/resolvers/user.resolver';
import { BoardResolver } from './resolvers/board.resolver';

const routes: Routes = [
  {
    path: '',
    component: BoardsPageComponent,
    resolve: {
      user: UserResolver,
    },
  },
  {
    path: ':id',
    component: BoardViewComponent,
    resolve: {
      board: BoardResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BoardResolver],
})
export class BoardsRoutingModule {}
