import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Board } from '../../models/board.model';
import * as fromBoards from '../../store/reducers/boards.reducer';
import * as BoardsActions from '../../store/actions/boards.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-board-preview',
  templateUrl: './board-preview.component.html',
  styleUrls: ['./board-preview.component.scss'],
})
export class BoardPreviewComponent implements OnInit {
  @Input() public board!: Board;
  @Output() deleteBoard = new EventEmitter<Board>();
  formVisible: boolean = false;
  updateBoardForm!: FormGroup;

  initForm() {
    this.updateBoardForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  constructor(private fb: FormBuilder, private store: Store<fromBoards.BoardsState>) {}
  ngOnInit(): void {
    this.initForm();
  }

  onDelete(event: MouseEvent): void {
    event.stopPropagation();
    this.deleteBoard.emit(this.board);
  }

  onSubmit(ngForm: FormGroupDirective): void {
    const { title } = this.updateBoardForm.value;
    const { owner, users, _id } = this.board! as Board;
    this.store.dispatch(BoardsActions.updateBoard({ board: { title, owner, users, _id } }));
    this.updateBoardForm.reset();
    ngForm.resetForm();
  }

  update(event: MouseEvent): void {
    event.stopPropagation();
    this.formVisible = true;
    this.updateBoardForm.setValue({ title: this.board?.title });
  }

  cancel(event: MouseEvent): void {
    event.stopPropagation();
    this.formVisible = false;
  }

  onClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
