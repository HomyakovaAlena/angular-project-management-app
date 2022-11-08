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
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm: FormGroup = this.fb.group({
    login: ['', [Validators.required, this.customValidator]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private authFacade: AuthFacade) {}

  onSubmit(ngForm: FormGroupDirective) {
    console.log('reactive form submitted - in login');
    console.log(this.loginForm);
    // this.loginSignupForm.emit({
    //   ...this.loginSignupForm.value,
    // });
    const { login, password } = this.loginForm.value;
    this.authFacade.login(login, password);
    this.loginForm.reset();
    ngForm.resetForm();
    console.log('logged in');
  }

  private customValidator(control: AbstractControl): ValidationErrors | null {
    // console.log(control);
    // return { customValue: true }
    return null;
  }
}
