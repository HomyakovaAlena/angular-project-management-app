import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Board } from '../../models/board.model';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss'],
})
export class BoardViewComponent implements OnInit {
  board$!: Observable<Board>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardService: BoardService,
  ) {}

  ngOnInit() {
    this.board$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.boardService.getBoardById(params.get('id')!)),
    );
  }

  gotoBoards(board: Board) {
    const boardId = board ? board._id : null;
    this.router.navigate([`/boards`]);
  }

}
