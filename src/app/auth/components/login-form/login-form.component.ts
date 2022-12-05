import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { AuthFacade } from '../../store/auth.facade';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginErrors: string[] = [];
  passwordErrors: string[] = [];
  loginForm!: FormGroup;

  private initForm() {
    this.loginForm = this.fb.group({
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

  getLoginErrorMessage(): void {
    this.loginErrors = ValidationService.getFormControlErrors(this.loginForm, 'login');
  }

  getPasswordErrorMessage(): void {
    this.passwordErrors = ValidationService.getFormControlErrors(this.loginForm, 'password');
  }

  onSubmit(ngForm: FormGroupDirective): void {
    const { login, password } = this.loginForm.value;
    this.authFacade.login(login, password);
    this.loginForm.reset();
    ngForm.resetForm();
  }
}
