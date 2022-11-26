import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CreateBoardButtonComponent } from './components/create-board-button/create-board-button.component';
import { BoardViewComponent } from './components/board-view/board-view.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardsListComponent } from './components/boards-list/boards-list.component';
import { BoardPreviewComponent } from './components/board-preview/board-preview.component';
import { CreateBoardDialogComponent } from './components/create-board-dialog/create-board-dialog.component';

import { BoardsRoutingModule } from './boards-routing.module';
import { boardsReducer } from './store/reducers/boards.reducer';
import { BoardsEffects } from './store/effects/boards.effects';
import { BoardService } from './services/board.service';

import { TasksModule } from '../tasks/tasks.module';
import { UsersModule } from '../users/users.module';
import { SharedModule } from '../shared/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    BoardsPageComponent,
    BoardsListComponent,
    BoardPreviewComponent,
    CreateBoardDialogComponent,
    CreateBoardButtonComponent,
    BoardViewComponent,
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    FormsModule,
    StoreModule.forFeature('boards', boardsReducer),
    EffectsModule.forFeature([BoardsEffects]),
    SharedModule,
    UsersModule,
    TasksModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatRippleModule,
    MatChipsModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  exports: [BoardsPageComponent, CreateBoardButtonComponent],
  providers: [BoardService],
})
export class BoardsModule {}
