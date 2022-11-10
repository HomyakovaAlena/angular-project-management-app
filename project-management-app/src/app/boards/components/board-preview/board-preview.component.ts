import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/users/services/user.service';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-board-preview',
  templateUrl: './board-preview.component.html',
  styleUrls: ['./board-preview.component.scss'],
})
export class BoardPreviewComponent implements OnInit {
  @Input() board: Board | null | undefined = null;
  @Output() deleteBoard = new EventEmitter<Board | null>();

  constructor(private userService: UserService) {}
  ngOnInit(): void {}

  onDelete() {
    this.deleteBoard.emit(this.board);
  }
}
