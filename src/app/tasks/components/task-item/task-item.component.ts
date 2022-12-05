import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { Board } from 'src/app/boards/models/board.model';
import { Task, Column } from '../../models/tasks.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() public tasksList!: Task[];
  @Input() public task!: Task;
  @Input() public column!: Column;
  @Input() public board!: Board;
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() editTask = new EventEmitter<Task>();

  constructor() {}
  ngOnInit(): void {}

  onDelete(event: Event): void {
    event.stopImmediatePropagation();
    this.deleteTask.emit(this.task);
  }

  onEdit(): void {
    this.editTask.emit(this.task);
  }

  showMore(event: MouseEvent): void {
    event.stopPropagation();
  }
}
