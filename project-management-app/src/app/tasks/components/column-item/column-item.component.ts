import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from 'src/app/boards/models/board.model';
import { Column, Task } from '../../models/tasks.model';
import { Store } from '@ngrx/store';
import * as fromTasks from '../../store/reducers/tasks.reducer';
import * as TasksActions from '../../store/actions/tasks.actions';
import { SharedService } from 'src/app/shared/services/shared.service';
import * as SharedActions from '../../../shared/store/actions/shared.actions';

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss'],
})
export class ColumnItemComponent implements OnInit {
  @Input() column: Column | null | undefined = null;
  @Input() board: Board | null | undefined = null;
  @Output() deleteColumn = new EventEmitter<Column | null>();
  tasksList$ = this.store.select(fromTasks.getTasks);

  constructor(private store: Store<fromTasks.TasksState>, private sharedService: SharedService) {}
  ngOnInit(): void {
    this.store.dispatch(
      TasksActions.loadTasks({ boardId: this.board?._id, columnId: this.column?._id }),
    );
  }

  onDelete() {
    this.deleteColumn.emit(this.column);
  }

  openDialog(task: Task | null | undefined) {
    if (!task) return;
    const { _id, title } = task;
    const dialogConfig = this.sharedService.createConfigDialog({
      name: 'confirmDelete',
      title: 'Are you sure you want to delete this item?',
      description: 'If you confirm, the item ' + title + ' will be deleted.',
      actionButtonText: 'Delete',
      itemName: title,
      itemId: _id,
      action: 'deleteTask',
      routeParameteres: { boardId: this.board?._id, columnId: this.column?._id },
    });
    this.store.dispatch(SharedActions.openDialog({ data: dialogConfig }));
  }
}
