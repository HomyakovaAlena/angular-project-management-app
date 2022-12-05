import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { AuthFacade } from '../../store/auth.facade';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  nameErrors: string[] = [];
  loginErrors: string[] = [];
  passwordErrors: string[] = [];
  signupForm!: FormGroup;

  private initForm() {
    this.signupForm = this.fb.group({
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
  }

  constructor(private fb: FormBuilder, private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.initForm();
  }

  getNameErrorMessage(): void {
    this.nameErrors = ValidationService.getFormControlErrors(this.signupForm, 'name');
  }

  getLoginErrorMessage(): void {
    this.loginErrors = ValidationService.getFormControlErrors(this.signupForm, 'login');
  }

  getPasswordErrorMessage(): void {
    this.passwordErrors = ValidationService.getFormControlErrors(this.signupForm, 'password');
  }

  onSubmit(ngForm: FormGroupDirective): void {
    const { name, login, password } = this.signupForm.value;
    this.authFacade.signup(name, login, password);
    this.signupForm.reset();
    ngForm.resetForm();
  }
}
