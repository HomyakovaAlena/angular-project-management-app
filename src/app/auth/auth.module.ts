import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SignupComponent } from './components/signup/signup.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { EditProfileFormComponent } from './components/edit-profile-form/edit-profile-form.component';

import { AuthFacade } from './store/auth.facade';
import { AuthService } from './services/auth.service';
import { AuthEffects } from './store/effects/auth.effects';
import { authReducer, AUTH_FEATURE_KEY } from './store/reducer/auth.reducer';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    SignupComponent,
    EditProfileComponent,
    EditProfileFormComponent,
    LoginFormComponent,
    SignupFormComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer),
    EffectsModule.forFeature([AuthEffects]),
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  exports: [LoginComponent, LogoutComponent, SignupComponent, EditProfileComponent],
  providers: [AuthFacade, AuthService],
})
export class AuthModule {}
