import { CreateBoardDialogComponent } from 'src/app/boards/components/create-board-dialog/create-board-dialog.component';
import { ModalConfirmComponent } from '../components/modal-confirm/modal-confirm.component';
import { CreateColumnDialogComponent } from 'src/app/tasks/components/create-column-dialog/create-column-dialog.component';
import { CreateTaskDialogComponent } from 'src/app/tasks/components/create-task-dialog/create-task-dialog.component';

export const ConfirmationComponentsMap = {
  confirmDelete: ModalConfirmComponent,
  createBoard: CreateBoardDialogComponent,
  createColumn: CreateColumnDialogComponent,
  createTask: CreateTaskDialogComponent,
  editTask: CreateTaskDialogComponent,
};
