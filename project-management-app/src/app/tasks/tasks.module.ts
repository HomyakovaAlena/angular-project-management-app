import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ColumnsListComponent } from './components/columns-list/columns-list.component';
import { ColumnItemComponent } from './components/column-item/column-item.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { BoardItemPageComponent } from './pages/board-item-page/board-item-page.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CreateColumnButtonComponent } from './components/create-column-button/create-column-button.component';
import { MatRippleModule } from '@angular/material/core';
import { CreateColumnDialogComponent } from './components/create-column-dialog/create-column-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsersModule } from '../users/users.module';
import { StoreModule } from '@ngrx/store';
import { boardsReducer } from '../boards/store/reducers/boards.reducer';
import { EffectsModule } from '@ngrx/effects';
import { columnsReducer } from './store/reducers/columns.reducer';
import { ColumnsEffects } from './store/effects/columns.effects';
import { tasksReducer } from './store/reducers/tasks.reducer';
import { TasksEffects } from './store/effects/tasks.effects';
import { MatCardModule } from '@angular/material/card';
import { CreateTaskButtonComponent } from './components/create-task-button/create-task-button.component';
import { CreateTaskDialogComponent } from './components/create-task-dialog/create-task-dialog.component';
import { TasksByColumnsPipe } from '../shared/pipes/tasks-by-columns.pipe';
import { SharedModule } from '../shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    ColumnsListComponent,
    ColumnItemComponent,
    TasksListComponent,
    TaskItemComponent,
    BoardItemPageComponent,
    CreateColumnButtonComponent,
    CreateColumnDialogComponent,
    CreateTaskButtonComponent,
    CreateTaskDialogComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    DragDropModule,
    MatRippleModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatChipsModule,
    UsersModule,
    StoreModule.forFeature('columns', columnsReducer),
    EffectsModule.forFeature([ColumnsEffects]),
    StoreModule.forFeature('tasks', tasksReducer),
    EffectsModule.forFeature([TasksEffects]),
    SharedModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
  exports: [BoardItemPageComponent],
})
export class TasksModule {}
