import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardService } from './services/board.service';
import { BoardsListComponent } from './components/boards-list/boards-list.component';
import { BoardPreviewComponent } from './components/board-preview/board-preview.component';
import { CreateBoardComponent } from './components/create-board/create-board.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [BoardsPageComponent, BoardsListComponent, BoardPreviewComponent, CreateBoardComponent],
  imports: [CommonModule, BoardsRoutingModule, MatInputModule, FormsModule, MatCardModule],
  exports: [BoardsPageComponent],
  providers: [BoardService]
})
export class BoardsModule {}
