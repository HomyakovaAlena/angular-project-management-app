import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
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
    this.dialog.open(ModalConfirmComponent, configMatDialog);
  }

  createConfigDialog(data: ModalData) {
    const dialogConfig = new MatDialogConfig<ModalData>();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    dialogConfig.data = data;
    return dialogConfig;
  }

  // modalAction(modalData: ModalData) {
  //   switch (modalData['name']) {
  //     // case 'logout':
  //     //   this.logout(modalData);
  //     //   break;

  //     case 'confirmDelete':
  //       this.boardService.deleteBoard(modalData['id']);
  //       break;

  //     default:
  //       break;
  //   }
  // }
}
