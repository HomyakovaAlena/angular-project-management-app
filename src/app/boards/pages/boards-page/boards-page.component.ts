import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromBoards from '../../store/reducers/boards.reducer';
import * as BoardsActions from '../../store/actions/boards.actions';
import * as SharedActions from '../../../shared/store/actions/shared.actions';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Board } from '../../models/board.model';
import { User } from 'src/app/auth/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  user!: User;
  boardsList$ = this.store.select(fromBoards.getBoards);

  constructor(
    private store: Store<fromBoards.BoardsState>,
    private sharedService: SharedService,
    private activatedroute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.user = this.activatedroute.snapshot.data['user'];
    const userId = this.user._id as string;
    this.store.dispatch(BoardsActions.loadBoards({ userId }));
  }

  openDialog(board: Board): void {
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
