import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ModalData } from '../models/shared.model';
import * as BoardsActions from '../../boards/store/actions/boards.actions';
import * as ColumnsActions from '../../tasks/store/actions/columns.actions';
import * as TasksActions from '../../tasks/store/actions/tasks.actions';
import { AuthFacade } from 'src/app/auth/store/auth.facade';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { ConfirmationComponentsMap } from '../constants/confirmationDialogMaps.constants';
import { ComponentType } from '@angular/cdk/portal';

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

  public openDialog(configMatDialog: MatDialogConfig<ModalData> | null | undefined): void {
    const dialogType = configMatDialog?.data?.name;
    const confirmComponent = ConfirmationComponentsMap[
      dialogType as keyof typeof ConfirmationComponentsMap
    ] as ComponentType<any>;

    if (dialogType && confirmComponent) {
      this.dialog.open(confirmComponent, configMatDialog);
    }
  }

  public createConfigDialog(data: ModalData): MatDialogConfig<ModalData> {
    const dialogConfig = new MatDialogConfig<ModalData>();
    dialogConfig.disableClose = false;
    dialogConfig.data = data;
    return dialogConfig;
  }

  public confirmDialogAction(data: ModalData | null | undefined): void {
    const action = data?.action;
    const id = data?.['itemId'] as string;
    const columnId = data?.parameters?.columnId as string;
    const boardId = data?.parameters?.boardId as string;
    return this.chooseConfirmationAction(action, id, columnId, boardId);
  }

  private chooseConfirmationAction(
    action: string | undefined,
    id: string | undefined = '',
    columnId: string | undefined = '',
    boardId: string | undefined = '',
  ): void {
    const confirmationActionMap = {
      deleteUser: this.authFacade.deleteUser(id),
      deleteBoard: this.store.dispatch(BoardsActions.deleteBoard({ id })),
      deleteColumn: this.store.dispatch(ColumnsActions.deleteColumn({ boardId, columnId: id })),
      deleteTask: this.store.dispatch(TasksActions.deleteTask({ boardId, columnId, taskId: id })),
    };
    const chosenAction = confirmationActionMap[action as keyof typeof confirmationActionMap];
    return chosenAction;
  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }

  public openSnackBar(message: string): void {
    const durationInSeconds = 3;
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: durationInSeconds * 1000,
      data: message,
    });
  }
}
