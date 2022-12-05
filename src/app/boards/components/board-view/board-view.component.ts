import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Board } from '../../models/board.model';
import * as ColumnsActions from '../../../tasks/store/actions/columns.actions';
import * as TasksActions from '../../../tasks/store/actions/tasks.actions';
import { Store } from '@ngrx/store';
import * as fromColumns from '../../../tasks/store/reducers/columns.reducer';
import * as fromTasks from '../../../tasks/store/reducers/tasks.reducer';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss'],
})
export class BoardViewComponent implements OnInit, OnDestroy {
  board!: Board;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private columnsStore: Store<fromColumns.ColumnsState>,
    private tasksStore: Store<fromTasks.TasksState>,
  ) {}

  ngOnInit() {
    this.board = this.route.snapshot.data['board'];
  }

  gotoBoards(): void {
    this.router.navigate([`/boards`]);
  }

  ngOnDestroy(): void {
    this.columnsStore.dispatch(ColumnsActions.resetColumnsState());
    this.tasksStore.dispatch(TasksActions.resetTasksState());
  }
}
