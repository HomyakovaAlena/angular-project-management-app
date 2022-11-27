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
  @Input() public board: Board | null | undefined = null;
  constructor(private sharedService: SharedService, private store: Store) {}

  ngOnInit(): void {}

  protected openDialog(): void {
    const dialogConfig = this.sharedService.createConfigDialog({
      name: 'createColumn',
      title: $localize`Creating column...`,
      description: $localize`Fill in the form to create new column`,
      actionButtonText: $localize`Create new column`,
      action: 'createColumn',
      parameters: { boardId: this.board?._id },
    });

    this.store.dispatch(SharedActions.openDialog({ data: dialogConfig }));
  }
}
