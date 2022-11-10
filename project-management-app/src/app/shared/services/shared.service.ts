import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { CreateBoardButtonComponent } from 'src/app/boards/components/create-board-button/create-board-button.component';
import { CreateBoardDialogComponent } from 'src/app/boards/components/create-board-dialog/create-board-dialog.component';
import { BoardService } from 'src/app/boards/services/board.service';
import { deleteBoard } from 'src/app/boards/store/actions/boards.actions';
import { ModalConfirmComponent } from '../components/modal-confirm/modal-confirm.component';
import { ModalData } from '../models/shared.model';
import * as BoardsActions from '../../boards/store/actions/boards.actions';
import { AuthFacade } from 'src/app/auth/store/auth.facade';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

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
      default:
        break;
    }
  }

  createConfigDialog(data: ModalData): MatDialogConfig<ModalData> {
    const dialogConfig = new MatDialogConfig<ModalData>();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    // dialogConfig.height = '600px';
    // dialogConfig.width = '600px';
    dialogConfig.data = data;
    return dialogConfig;
  }

  confirmDialogAction(data: ModalData | null | undefined) {
    const id = data?.['itemId'] as string;
    switch (data?.action) {
      case 'deleteBoard':
        this.store.dispatch(BoardsActions.deleteBoard({ id: id }));
        break;
      case 'deleteUser':
        this.authFacade.deleteUser(id);
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
