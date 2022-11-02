import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Board } from '../../models/board.model';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
} from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent {
  @Output() createBoard = new EventEmitter<Board>();

  createBoardForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    owner: ['', [Validators.required, this.customValidator]],
    users: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(ngForm: FormGroupDirective) {
    console.log('reactive form submitted');
    console.log(this.createBoardForm);
    this.createBoard.emit({
      ...this.createBoardForm.value,
    });

    this.createBoardForm.reset();
    ngForm.resetForm();
  }

  private customValidator(control: AbstractControl): ValidationErrors | null {
    // console.log(control);
    // return { customValue: true }
    return null;
  }
}
