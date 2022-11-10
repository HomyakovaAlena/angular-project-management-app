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
import { SharedService } from 'src/app/shared/services/shared.service';
import * as FromAuth from '../../models/user.model';
import { Store } from '@ngrx/store';
import * as SharedActions from '../../../shared/store/actions/shared.actions';

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
  protected repeatPassword: string | undefined = '';

  editProfileForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    login: ['', [Validators.required, this.customValidator]],
    password: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required]],
  });

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
      console.log(this.name, this.login, this.password);
    });
  }
  onSubmit(ngForm: FormGroupDirective) {
    console.log('submitted clicked');
    const _id = this._id;
    const { login, name, password } = this.editProfileForm.value;
    this.authFacade.updateUser({ _id, login, name, password });
    this.editProfileForm.reset();
    ngForm.resetForm();
  }

  private customValidator(control: AbstractControl): ValidationErrors | null {
    // console.log(control);
    // return { customValue: true }
    return null;
  }

  openDialog() {
    if (!this._id) return;
    // this.authFacade.deleteUser(this._id);

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
