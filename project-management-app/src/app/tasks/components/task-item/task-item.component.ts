import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from 'src/app/boards/models/board.model';
import { Task, Column } from '../../models/tasks.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task | null | undefined = null;
  @Input() column: Column | null | undefined = null;
  @Input() board: Board | null | undefined = null;
  @Output() deleteTask = new EventEmitter<Task | null>();

  constructor() {}
  ngOnInit(): void {}

  onDelete() {
    this.deleteTask.emit(this.task);
  }
}
