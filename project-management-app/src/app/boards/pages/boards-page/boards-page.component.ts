import { Component, OnInit } from '@angular/core';
import { Board } from '../../models/board.model';
import { BoardService } from '../../services/board.service';

import * as fromBoards from '../../store/reducers/boards.reducer';
import * as BoardsActions from '../../store/actions/boards.actions';
import { Store } from '@ngrx/store';
import * as SharedActions from '../../../shared/store/actions/shared.actions';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';
import { MatDialogConfig } from '@angular/material/dialog';
import { ModalData } from 'src/app/shared/models/shared.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  boardsList$ = this.store.select(fromBoards.getBoards);

  constructor(private store: Store<fromBoards.BoardsState>, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.store.dispatch(BoardsActions.loadBoards());
  }

  // createBoard(board: Board) {
  //   this.store.dispatch(BoardsActions.createBoard({ board }));
  // }

  openDialog(id: string) {
    const dialogConfig = this.sharedService.createConfigDialog({
      name: 'confirmDelete',
      title: 'Are you sure you want to delete this item?',
      description: 'If you continue, the item with ID ' + id + ' will be deleted.',
      actionButtonText: 'Delete',
      id: id,
      action: 'deleteBoard',
    }) as ModalData | null | undefined;
    this.store.dispatch(SharedActions.openDialog({ data: dialogConfig }));
  }
}
