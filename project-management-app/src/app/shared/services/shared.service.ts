import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateBoardDialogComponent } from 'src/app/boards/components/create-board-dialog/create-board-dialog.component';
import { ModalConfirmComponent } from '../components/modal-confirm/modal-confirm.component';
import { ModalData } from '../models/shared.model';
import * as BoardsActions from '../../boards/store/actions/boards.actions';
import * as ColumnsActions from '../../tasks/store/actions/columns.actions';
import * as TasksActions from '../../tasks/store/actions/tasks.actions';
import { AuthFacade } from 'src/app/auth/store/auth.facade';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { CreateColumnDialogComponent } from 'src/app/tasks/components/create-column-dialog/create-column-dialog.component';
import { CreateTaskDialogComponent } from 'src/app/tasks/components/create-task-dialog/create-task-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authFacade: AuthFacade,
    private store: Store,
  ) {}

  openDialog(configMatDialog: MatDialogConfig<ModalData> | null | undefined) {
    switch (configMatDialog?.data?.name) {
      case 'confirmDelete':
        this.dialog.open(ModalConfirmComponent, configMatDialog);
        break;
      case 'createBoard':
        this.dialog.open(CreateBoardDialogComponent, configMatDialog);
        break;
      case 'createColumn':
        this.dialog.open(CreateColumnDialogComponent, configMatDialog);
        break;
      case 'createTask':
        this.dialog.open(CreateTaskDialogComponent, configMatDialog);
        break;
      case 'editTask':
        console.log('edit in open dialog');
        this.dialog.open(CreateTaskDialogComponent, configMatDialog);
        break;
      default:
        break;
    }
  }

  createConfigDialog(data: ModalData): MatDialogConfig<ModalData> {
    const dialogConfig = new MatDialogConfig<ModalData>();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.data = data;
    return dialogConfig;
  }

  confirmDialogAction(data: ModalData | null | undefined) {
    console.log('in confirm');
    const id = data?.['itemId'] as string;
    const boardId = data?.parameters?.boardId as string;
    const columnId = data?.parameters?.columnId as string;
    switch (data?.action) {
      case 'deleteUser':
        this.authFacade.deleteUser(id);
        break;
      case 'deleteBoard':
        this.store.dispatch(BoardsActions.deleteBoard({ id: id }));
        break;
      case 'deleteColumn':
        this.store.dispatch(ColumnsActions.deleteColumn({ boardId: boardId, columnId: id }));
        break;
      case 'deleteTask':
        this.store.dispatch(
          TasksActions.deleteTask({ boardId: boardId, columnId: columnId, taskId: id }),
        );
        break;
      default:
        break;
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  openSnackBar(message: string): void {
    const durationInSeconds = 3;
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: durationInSeconds * 1000,
      data: message,
    });
  }
}
