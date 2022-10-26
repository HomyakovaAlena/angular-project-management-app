import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent implements OnInit {
  boardTitle = '';
  boardOwner = '';
  boardUsers = [];
  idCounter = 0;

  @Output() createBoard = new EventEmitter<Board>();
  constructor() {}

  ngOnInit(): void {}
  onSubmit() {
    this.createBoard.emit({
      // id: this.idCounter,
      title: this.boardTitle,
      owner: this.boardOwner,
      users: this.boardUsers,
    });
    this.idCounter++;
    this.boardTitle = '';
  }
}
