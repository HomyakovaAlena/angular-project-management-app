import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Store } from '@ngrx/store';
import * as fromBoards from '../../store/reducers/boards.reducer';
import * as SharedActions from '../../../shared/store/actions/shared.actions';
import { AuthFacade } from 'src/app/auth/store/auth.facade';
@Component({
  selector: 'app-create-board-button',
  templateUrl: './create-board-button.component.html',
  styleUrls: ['./create-board-button.component.scss'],
})
export class CreateBoardButtonComponent implements OnInit {
  protected isLoggedIn$ = this.authFacade.isLoggedIn$;
  constructor(
    private sharedService: SharedService,
    private store: Store<fromBoards.BoardsState>,
    private authFacade: AuthFacade,
  ) {}

  ngOnInit(): void {}
  protected openDialog(): void {
    const dialogConfig = this.sharedService.createConfigDialog({
      name: `createBoard`,
      title: $localize`Creating board...`,
      description: $localize`Fill in the form to create new board.`,
      actionButtonText: $localize`Create new board`,
      action: `createBoard`,
    });
    this.store.dispatch(SharedActions.openDialog({ data: dialogConfig }));
  }
}
