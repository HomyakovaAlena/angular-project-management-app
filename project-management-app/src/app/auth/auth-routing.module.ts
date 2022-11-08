import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { NoAuthGuardGuard } from './guards/no-auth-guard.guard';
import { AuthComponent } from './pages/auth/auth.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent, canActivate: [NoAuthGuardGuard] },
  { path: 'signup', component: SignupFormComponent, canActivate: [NoAuthGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
