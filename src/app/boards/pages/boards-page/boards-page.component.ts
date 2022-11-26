import { Component, OnInit } from '@angular/core';
import * as fromBoards from '../../store/reducers/boards.reducer';
import * as fromUsers from '../../../users/store/reducers/users.reducer';
import * as BoardsActions from '../../store/actions/boards.actions';
import { Store } from '@ngrx/store';
import * as SharedActions from '../../../shared/store/actions/shared.actions';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AuthFacade } from 'src/app/auth/store/auth.facade';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  protected boardsList$ = this.store.select(fromBoards.getBoards);
  protected user$ = this.authFacade.user$;
  protected usersList$ = this.store.select(fromUsers.getUsers);

  constructor(
    private store: Store<fromBoards.BoardsState>,
    private sharedService: SharedService,
    private authFacade: AuthFacade,
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user) this.store.dispatch(BoardsActions.loadBoards({ userId: user?._id }));
    });
  }

  protected openDialog(board: Board | null | undefined): void {
    if (!board) return;
    const { _id, title } = board;
    const dialogConfig = this.sharedService.createConfigDialog({
      name: `confirmDelete`,
      title: $localize`Are you sure you want to delete this item?`,
      description: $localize`If you confirm, the item ${title}:boardTitle: will be deleted.`,
      actionButtonText: $localize`Delete`,
      itemName: title,
      itemId: _id,
      action: `deleteBoard`,
    });
    this.store.dispatch(SharedActions.openDialog({ data: dialogConfig }));
  }
}
