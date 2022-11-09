import { Component, OnInit } from '@angular/core';
import { Board } from '../../models/board.model';
import { BoardService } from '../../services/board.service';

import * as fromBoards from '../../store/reducers/boards.reducer';
import * as fromUsers from '../../../users/store/reducers/users.reducer';
import * as BoardsActions from '../../store/actions/boards.actions';
import * as UsersActions from '../../../users/store/actions/users.actions';
import { Store } from '@ngrx/store';
import * as SharedActions from '../../../shared/store/actions/shared.actions';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';
import { MatDialogConfig } from '@angular/material/dialog';
import { ModalData } from 'src/app/shared/models/shared.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ComponentType } from '@angular/cdk/portal';
import { AuthFacade } from 'src/app/auth/store/auth.facade';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  boardsList$ = this.store.select(fromBoards.getBoards);
  user$ = this.authFacade.user$;
  usersList$ = this.store.select(fromUsers.getUsers);

  constructor(
    private store: Store<fromBoards.BoardsState>,
    private usersStore: Store<fromUsers.UsersState>,
    private sharedService: SharedService,
    private authFacade: AuthFacade,
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user) this.store.dispatch(BoardsActions.loadBoards({ userId: user?._id }));
    });

    this.boardsList$.subscribe((board) => console.log(board, 'oninit boards'));
    this.usersList$.subscribe((users) => console.log(users, 'oninit users'));
    // this.usersStore.dispatch(UsersActions.loadUsers());
  }

  // createBoard(board: Board) {
  //   this.store.dispatch(BoardsActions.createBoard({ board }));
  // }

  openDialog(id: string) {
    this.user$.subscribe((user) => console.log(user, 'openDialog user'));
    this.usersList$.subscribe((users) => console.log(users, 'openDialog users'));
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
