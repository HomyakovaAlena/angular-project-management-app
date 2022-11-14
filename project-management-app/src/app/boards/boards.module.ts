import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardService } from './services/board.service';
import { BoardsListComponent } from './components/boards-list/boards-list.component';
import { BoardPreviewComponent } from './components/board-preview/board-preview.component';
import { CreateBoardDialogComponent } from './components/create-board-dialog/create-board-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { boardsReducer } from './store/reducers/boards.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BoardsEffects } from './store/effects/boards.effects';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateBoardButtonComponent } from './components/create-board-button/create-board-button.component';
import { UsersModule } from '../users/users.module';
import { UsernameByIdPipe } from '../users/pipes/username-by-id.pipe';
import { BoardViewComponent } from './components/board-view/board-view.component';
import { TasksModule } from '../tasks/tasks.module';

// import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
// import { UsersSearchBarComponent } from '../users/components/users-search-bar/users-search-bar.component';
// import { UsersModule } from '../users/users.module';

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
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    SharedModule,

    UsersModule,
    TasksModule,

    // MatAutocompleteSelectedEvent,
    // UsersSearchBarComponent,
    // UsersModule
  ],
  exports: [BoardsPageComponent, CreateBoardButtonComponent],
  providers: [BoardService],
})
export class BoardsModule {}
