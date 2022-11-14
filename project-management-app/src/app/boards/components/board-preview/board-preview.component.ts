import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-board-preview',
  templateUrl: './board-preview.component.html',
  styleUrls: ['./board-preview.component.scss'],
})
export class BoardPreviewComponent implements OnInit {
  @Input() board: Board | null | undefined = null;
  @Output() deleteBoard = new EventEmitter<Board | null>();

  constructor() {}
  ngOnInit(): void {}

  onDelete() {
    this.deleteBoard.emit(this.board);
  }
}
