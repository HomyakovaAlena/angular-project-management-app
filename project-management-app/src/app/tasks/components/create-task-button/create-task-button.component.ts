import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Board } from 'src/app/boards/models/board.model';
import { Column, Task } from '../../models/tasks.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import * as SharedActions from '../../../shared/store/actions/shared.actions';

@Component({
  selector: 'app-create-task-button',
  templateUrl: './create-task-button.component.html',
  styleUrls: ['./create-task-button.component.scss'],
})
export class CreateTaskButtonComponent implements OnInit {
  @Input() column: Column | null | undefined = null;
  @Input() board: Board | null | undefined = null;
  constructor(
    private sharedService: SharedService,
    private store: Store,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {}

  openDialog() {
    console.log(this.board?.title, this.column?.title, 'from open dialog create task');
    const dialogConfig = this.sharedService.createConfigDialog({
      name: 'createTask',
      title: 'Creating task...',
      description: 'Fill in the form to create new task',
      actionButtonText: 'Create new task',
      action: 'createTask',
      routeParameteres: { boardId: this.board?._id, columnId: this.column?._id },
    });

    this.store.dispatch(SharedActions.openDialog({ data: dialogConfig }));
  }
}