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
  @Input() public tasksList!: Task[];
  @Input() public column!: Column;
  @Input() public board!: Board;
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() editTask = new EventEmitter<Task>();

  constructor(private store: Store<fromTasks.TasksState>, private taskService: TaskService) {}

  ngOnChanges(): void {
    this.tasksList = this.tasksList.length ? this.tasksList : [];
  }

  onDelete(task: Task): void {
    this.deleteTask.emit(task);
  }

  onEdit(task: Task): void {
    this.editTask.emit(task);
  }

  drop(event: CdkDragDrop<Task[]>): void {
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
