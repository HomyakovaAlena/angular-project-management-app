import { Component, OnInit } from '@angular/core';
import { Board } from '../../models/board.model';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss']
})
export class BoardsPageComponent implements OnInit {

  boardsList: Board[] = [];
  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.getBoards();
  }

  createBoard(board: Board) {
    this.boardService.createBoard(board).subscribe(() => this.getBoards());
  }

  private getBoards() {
    this.boardService
      .getBoards()
      .subscribe((boardsList) => (this.boardsList = boardsList));
  }

  // onToggleComplete(changedBoard: Board) {
  //   this.boardService.toggleComplete(changedBoard).subscribe(() => {
  //     this.getTodos();
  //   })
  // }

}
