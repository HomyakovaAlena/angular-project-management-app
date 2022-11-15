import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { Board } from 'src/app/boards/models/board.model';
import { Task, Column } from '../../models/tasks.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import * as fromTasks from '../../store/reducers/tasks.reducer';
import { Store } from '@ngrx/store';
import * as TasksActions from '../../store/actions/tasks.actions';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnChanges {
  @Input() tasksList: Task[] | null | undefined = null;
  @Input() column: Column | null | undefined = null;
  @Input() board: Board | null | undefined = null;
  @Output() deleteTask = new EventEmitter<Task | null>();
  @Output() editTask = new EventEmitter<Task | null>();

  constructor(private store: Store<fromTasks.TasksState>, private taskService: TaskService) {}

  ngOnChanges(): void {
    this.tasksList = this.tasksList?.length ? this.tasksList : [];;
  }

  onDelete(task: Task | null | undefined) {
    this.deleteTask.emit(task);
  }

  onEdit(task: Task | null | undefined) {
    this.editTask.emit(task);
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (!this.tasksList) return;

    const { newOrder } = this.taskService.defineTaskOrder(this.tasksList, event);
    const draggedItemId = event.previousContainer.data[event.previousIndex]._id as string;

    if (event.previousContainer === event.container) {
      if (event.previousIndex === event.currentIndex) return;
      this.store.dispatch(
        TasksActions.changeTasksOrder({
          tasksArray: [
            { _id: draggedItemId, order: newOrder, columnId: this.column?._id as string },
          ],
        }),
      );
      moveItemInArray(this.tasksList, event.previousIndex, event.currentIndex);
    } else {
      this.store.dispatch(
        TasksActions.changeTasksOrder({
          tasksArray: [
            { _id: draggedItemId, order: newOrder, columnId: this.column?._id as string },
          ],
        }),
      );
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
