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
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import * as SharedActions from '../../../shared/store/actions/shared.actions';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss'],
})
export class EditProfileFormComponent implements OnInit {
  hide = true;
  nameErrors: string[] = [];
  loginErrors: string[] = [];
  passwordErrors: string[] = [];
  confirmPasswordErrors: string[] = [];
  editProfileForm!: FormGroup;
  user!: User;

  private initForm() {
    this.editProfileForm = this.fb.group(
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
  }

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade,
    private sharedService: SharedService,
    private store: Store<FromAuth.AuthState>,
    private activatedroute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.user = this.activatedroute.snapshot.data['user'];
    this.initForm();
    this.setValue();
  }

  private setValue(): void {
    this.editProfileForm.patchValue({
      name: this.user.name,
      login: this.user.login,
    });
  }

  getNameErrorMessage(): void {
    this.nameErrors = ValidationService.getFormControlErrors(this.editProfileForm, 'name');
  }

  getLoginErrorMessage(): void {
    this.loginErrors = ValidationService.getFormControlErrors(this.editProfileForm, 'login');
  }

  getPasswordErrorMessage(): void {
    this.passwordErrors = ValidationService.getFormControlErrors(this.editProfileForm, 'password');
  }

  getConfirmPasswordErrorMessage(): void {
    this.confirmPasswordErrors = ValidationService.getFormControlErrors(
      this.editProfileForm,
      'confirmPassword',
    );
  }

  private matchPassword(control: AbstractControl): ValidationErrors | null {
    return ValidationService.matchPassword(control);
  }

  onSubmit(ngForm: FormGroupDirective): void {
    const _id = this.user._id;
    const { login, name, password } = this.editProfileForm.value;
    this.authFacade.updateUser({ _id, login, name, password });
    this.editProfileForm.reset();
    ngForm.resetForm();
  }

  openDialog(): void {
    const [_id, name] = [this.user._id, this.user.name];
    const dialogConfig = this.sharedService.createConfigDialog({
      name: 'confirmDelete',
      title: $localize`Are you sure you want to delete your user?`,
      description: $localize`If you confirm, the user ${name}:user_name: will be deleted.`,
      actionButtonText: $localize`Delete`,
      itemName: name,
      itemId: _id,
      action: 'deleteUser',
    });
    this.store.dispatch(SharedActions.openDialog({ data: dialogConfig }));
  }
}
