import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Board } from 'src/app/boards/models/board.model';
import { Column } from '../../models/tasks.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import * as SharedActions from '../../../shared/store/actions/shared.actions';

@Component({
  selector: 'app-create-task-button',
  templateUrl: './create-task-button.component.html',
  styleUrls: ['./create-task-button.component.scss'],
})
export class CreateTaskButtonComponent implements OnInit {
  @Input() public column: Column | null | undefined = null;
  @Input() public board: Board | null | undefined = null;
  constructor(
    private sharedService: SharedService,
    private store: Store,
  ) {}

  ngOnInit(): void {}

  openDialog() {
     const dialogConfig = this.sharedService.createConfigDialog({
      name: 'createTask',
      title: $localize`Creating task...`,
      description: $localize`Fill in the form to create new task`,
      actionButtonText: $localize`Create new task`,
      action: 'createTask',
      parameters: { boardId: this.board?._id, columnId: this.column?._id },
    });

    this.store.dispatch(SharedActions.openDialog({ data: dialogConfig }));
  }
}
