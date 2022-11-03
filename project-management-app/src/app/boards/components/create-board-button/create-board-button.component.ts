import { Component, OnInit } from '@angular/core';
import { ModalData } from 'src/app/shared/models/shared.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Store } from '@ngrx/store';
import * as BoardsActions from '../../store/actions/boards.actions';
import * as fromBoards from '../../store/reducers/boards.reducer';
import * as SharedActions from '../../../shared/store/actions/shared.actions';

@Component({
  selector: 'app-create-board-button',
  templateUrl: './create-board-button.component.html',
  styleUrls: ['./create-board-button.component.scss'],
})
export class CreateBoardButtonComponent implements OnInit {
  constructor(private sharedService: SharedService, private store: Store<fromBoards.BoardsState>) {}

  ngOnInit(): void {}
  openDialog() {
    const dialogConfig = this.sharedService.createConfigDialog({
      name: 'createBoard',
      title: 'Creating board...',
      description: 'Fill in the form to create new board.',
      actionButtonText: 'Create new board',
      action: 'createBoard',
    }) as ModalData | null | undefined;
    this.store.dispatch(SharedActions.openDialog({ data: dialogConfig }));
  }
}
