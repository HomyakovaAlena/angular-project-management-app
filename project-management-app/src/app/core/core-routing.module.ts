import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardsPageComponent } from '../boards/pages/boards-page/boards-page.component';

const routes: Routes = [{ path: 'boards', component: BoardsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
