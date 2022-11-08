import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../models/user.model';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthFacade } from '../../store/auth.facade';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent {
  signupForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    login: ['', [Validators.required, this.customValidator]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private authFacade: AuthFacade) {}

  onSubmit(ngForm: FormGroupDirective) {
    console.log('reactive form submitted - in login');
    console.log(this.signupForm);
    // this.loginSignupForm.emit({
    //   ...this.loginSignupForm.value,
    // });
    const { name, login, password } = this.signupForm.value;
    this.authFacade.signup(name, login, password);
    this.signupForm.reset();
    ngForm.resetForm();
    console.log('logged in');
  }

  private customValidator(control: AbstractControl): ValidationErrors | null {
    // console.log(control);
    // return { customValue: true }
    return null;
  }
}
