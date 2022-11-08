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

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(public dialog: MatDialog, private boardService: BoardService) {}

  openDialog(configMatDialog: MatDialogConfig<ModalData>) {
    console.log({ configMatDialog }, 'from service');
    switch (configMatDialog.data?.['data'].name) {
      case 'confirmDelete':
        this.dialog.open(ModalConfirmComponent, configMatDialog as MatDialogConfig<ModalData>);
        break;
      case 'createBoard':
        this.dialog.open(
          CreateBoardDialogComponent,
          configMatDialog.data as MatDialogConfig<ModalData>,
        );
        break;
      default:
        break;
    }
  }

  createConfigDialog(data: ModalData) {
    const dialogConfig = new MatDialogConfig<ModalData>();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '500px';
    dialogConfig.width = '900px';
    dialogConfig.data = data;
    console.log(dialogConfig, 'waiting');
    return dialogConfig;
  }
}
