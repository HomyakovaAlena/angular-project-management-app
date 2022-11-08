import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { of, take } from 'rxjs';
import { UserService } from 'src/app/users/services/user.service';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-board-preview',
  templateUrl: './board-preview.component.html',
  styleUrls: ['./board-preview.component.scss'],
})
export class BoardPreviewComponent implements OnInit {
  @Input() board: Board | null = null;
  @Output() deleteBoard = new EventEmitter<string>();
  // users$ = of(this.board?.users.map((user) => {
  //   console.log(user, this.board);
  //   this.userService.getUserById(user).pipe(take(1))
  // }));
  // owner$ = this.userService.getUserById(this.board?.owner).pipe(take(1));
  constructor(private userService: UserService) {}
  ngOnInit(): void {}

  onDelete() {
    this.deleteBoard.emit(this.board?._id);
  }
}
