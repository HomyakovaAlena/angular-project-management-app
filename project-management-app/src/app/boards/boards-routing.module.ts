import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';


const routes: Routes = [{ path: '', component: BoardsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule {}
