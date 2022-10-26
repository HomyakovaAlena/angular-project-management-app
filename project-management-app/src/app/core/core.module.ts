import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { MatButtonModule } from '@angular/material/button';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { SignupButtonComponent } from './components/signup-button/signup-button.component';
import { LocalizationSwitcherComponent } from './components/localization-switcher/localization-switcher.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EditProfileButtonComponent } from './components/edit-profile-button/edit-profile-button.component';
import { MatIconModule } from '@angular/material/icon';
import { AllBoardsButtonComponent } from './components/all-boards-button/all-boards-button.component';
import { CreateBoardItemComponent } from './components/create-board-item/create-board-item.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent,
    ProgressBarComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    SignupButtonComponent,
    LocalizationSwitcherComponent,
    EditProfileButtonComponent,
    AllBoardsButtonComponent,
    CreateBoardItemComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
  ],
  exports: [HeaderComponent, FooterComponent, NotFoundPageComponent, ProgressBarComponent],
})
export class CoreModule {}
