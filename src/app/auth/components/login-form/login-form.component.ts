import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { AuthFacade } from '../../store/auth.facade';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  protected loginErrors: string[] | undefined = [];
  protected passwordErrors: string[] | undefined = [];

  protected loginForm: FormGroup = this.fb.group({
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

  constructor(private fb: FormBuilder, private authFacade: AuthFacade) {}

  getLoginErrorMessage() {
    this.loginErrors = ValidationService.getFormControlErrors(this.loginForm, 'login');
  }

  getPasswordErrorMessage() {
    this.passwordErrors = ValidationService.getFormControlErrors(this.loginForm, 'password');
  }

  onSubmit(ngForm: FormGroupDirective) {
    const { login, password } = this.loginForm.value;
    this.authFacade.login(login, password);
    this.loginForm.reset();
    ngForm.resetForm();
  }
}
