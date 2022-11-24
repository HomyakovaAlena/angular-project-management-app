import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth/guards/auth-guard.guard';
import { NoAuthGuardGuard } from './auth/guards/no-auth-guard.guard';
import { BoardViewComponent } from './boards/components/board-view/board-view.component';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { WelcomePageComponent } from './pm-app/pages/welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path: 'pm-app',
    component: WelcomePageComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'boards',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import('./boards/boards.module').then((m) => m.BoardsModule),
  },
  { path: '', redirectTo: '/pm-app', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
