import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth/guards/auth-guard.guard';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'pm-app', pathMatch: 'full' },
  {
    path: 'pm-app',
    loadChildren: () => import('./pm-app/pm-app.module').then((m) => m.PmAppModule),
  },
  {
    path: 'boards',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import('./boards/boards.module').then((m) => m.BoardsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
