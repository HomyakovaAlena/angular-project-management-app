import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { Board } from 'src/app/boards/models/board.model';
import { Task, Column } from '../../models/tasks.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() public tasksList: Task[] | null | undefined = null;
  @Input() public task: Task | null | undefined = null;
  @Input() public column: Column | null | undefined = null;
  @Input() public board: Board | null | undefined = null;
  @Output() protected deleteTask = new EventEmitter<Task | null>();
  @Output() protected editTask = new EventEmitter<Task | null>();

  constructor() {}
  ngOnInit(): void {}

  onDelete(event: Event) {
    event.stopImmediatePropagation();
    this.deleteTask.emit(this.task);
  }

  onEdit() {
    this.editTask.emit(this.task);
  }

  showMore(event: MouseEvent) {
    event.stopPropagation();
  }
}
