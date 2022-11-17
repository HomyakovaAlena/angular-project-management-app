import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { AuthFacade } from '../../store/auth.facade';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent {
  nameErrors: string[] | undefined = [];
  loginErrors: string[] | undefined = [];
  passwordErrors: string[] | undefined = [];

  signupForm: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z][a-zA-Z0-9-_.]{1,20}$'),
      ],
    ],
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z][a-zA-Z0-9-_.]{1,20}$'),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$'),
      ],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade, // private validationService: ValidationService,
  ) {}

  getNameErrorMessage() {
    this.nameErrors = ValidationService.getFormControlErrors(this.signupForm, 'name');
  }

  getLoginErrorMessage() {
    this.loginErrors = ValidationService.getFormControlErrors(this.signupForm, 'login');
  }

  getPasswordErrorMessage() {
    this.passwordErrors = ValidationService.getFormControlErrors(this.signupForm, 'password');
  }

  onSubmit(ngForm: FormGroupDirective) {
    const { name, login, password } = this.signupForm.value;
    this.authFacade.signup(name, login, password);
    this.signupForm.reset();
    ngForm.resetForm();
  }
}
