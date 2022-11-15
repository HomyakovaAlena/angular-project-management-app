import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Board } from '../../models/board.model';
import * as fromBoards from '../../store/reducers/boards.reducer';
import * as BoardsActions from '../../store/actions/boards.actions';
import { Store } from '@ngrx/store';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-board-preview',
  templateUrl: './board-preview.component.html',
  styleUrls: ['./board-preview.component.scss'],
})
export class BoardPreviewComponent implements OnInit {
  @Input() board: Board | null | undefined = null;
  @Output() deleteBoard = new EventEmitter<Board | null>();
  formVisible: boolean = false;

  updateBoardForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50), this.customValidator]],
  });

  constructor(private fb: FormBuilder, private store: Store<fromBoards.BoardsState>) {}
  ngOnInit(): void {}

  onDelete(event: MouseEvent) {
    event.stopPropagation();
    this.deleteBoard.emit(this.board);
  }

  onSubmit(ngForm: FormGroupDirective) {
    const { title } = this.updateBoardForm.value;
    const { owner, users, _id } = this.board! as Board;
    console.log(title, users, owner);
    this.store.dispatch(BoardsActions.updateBoard({ board: { title, owner, users, _id } }));
    this.updateBoardForm.reset();
    ngForm.resetForm();
  }

  private customValidator(control: AbstractControl): ValidationErrors | null {
    // console.log(control);
    // return { customValue: true }
    return null;
  }

  update(event: MouseEvent) {
    event.stopPropagation();
    this.formVisible = true;
    this.updateBoardForm.setValue({ title: this.board?.title });
  }

  cancel(event: MouseEvent) {
    event.stopPropagation();
    this.formVisible = false;
  }

  onClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
