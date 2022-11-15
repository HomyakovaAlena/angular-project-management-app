import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Board } from 'src/app/boards/models/board.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import * as SharedActions from '../../../shared/store/actions/shared.actions';

@Component({
  selector: 'app-create-column-button',
  templateUrl: './create-column-button.component.html',
  styleUrls: ['./create-column-button.component.scss'],
})
export class CreateColumnButtonComponent implements OnInit {
  @Input() board: Board | null | undefined = null;
  constructor(
    private sharedService: SharedService,
    private store: Store,
  ) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogConfig = this.sharedService.createConfigDialog({
      name: 'createColumn',
      title: 'Creating column...',
      description: 'Fill in the form to create new column',
      actionButtonText: 'Create new column',
      action: 'createColumn',
      parameters: { boardId: this.board?._id },
    });

    this.store.dispatch(SharedActions.openDialog({ data: dialogConfig }));
  }
}
