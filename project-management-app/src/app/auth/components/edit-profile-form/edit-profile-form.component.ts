import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthFacade } from '../../store/auth.facade';
import { SharedService } from 'src/app/shared/services/shared.service';
import * as FromAuth from '../../models/user.model';
import { Store } from '@ngrx/store';
import * as SharedActions from '../../../shared/store/actions/shared.actions';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss'],
})
export class EditProfileFormComponent implements OnInit {
  hide = true;
  user$ = this.authFacade.user$;
  private _id: string | undefined = '';
  protected name: string | undefined = '';
  protected login: string | undefined = '';
  protected password: string | undefined = '';
  protected confirmPassword: string | undefined = '';

  nameErrors: string[] | undefined = [];
  loginErrors: string[] | undefined = [];
  passwordErrors: string[] | undefined = [];
  confirmPasswordErrors: string[] | undefined = [];

  editProfileForm: FormGroup = this.fb.group(
    {
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
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$'),
        ],
      ],
    },
    {
      validator: [this.matchPassword],
    },
  );

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade,
    private sharedService: SharedService,
    private store: Store<FromAuth.AuthState>,
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.name = user?.name;
      this.login = user?.login;
      this.password = user?.password;
      this._id = user?._id;
    });
  }

  getNameErrorMessage() {
    this.nameErrors = ValidationService.getFormControlErrors(this.editProfileForm, 'name');
  }

  getLoginErrorMessage() {
    this.loginErrors = ValidationService.getFormControlErrors(this.editProfileForm, 'login');
  }

  getPasswordErrorMessage() {
    this.passwordErrors = ValidationService.getFormControlErrors(this.editProfileForm, 'password');
  }

  getConfirmPasswordErrorMessage() {
    this.confirmPasswordErrors = ValidationService.getFormControlErrors(
      this.editProfileForm,
      'confirmPassword',
    );
  }

  private matchPassword(control: AbstractControl): ValidationErrors | null {
    return ValidationService.matchPassword(control);
  }

  onSubmit(ngForm: FormGroupDirective) {
    const _id = this._id;
    const { login, name, password } = this.editProfileForm.value;
    this.authFacade.updateUser({ _id, login, name, password });
    this.editProfileForm.reset();
    ngForm.resetForm();
  }

  openDialog() {
    if (!this._id) return;
    const [_id, name] = [this._id, this.name];
    const dialogConfig = this.sharedService.createConfigDialog({
      name: 'confirmDelete',
      title: 'Are you sure you want to delete your user?',
      description: 'If you confirm, the user ' + name + ' will be deleted.',
      actionButtonText: 'Delete',
      itemName: name,
      itemId: _id,
      action: 'deleteUser',
    });
    this.store.dispatch(SharedActions.openDialog({ data: dialogConfig }));
  }
}
