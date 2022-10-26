import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'pm-app', pathMatch: 'full' },
  {
    path: 'pm-app',
    loadChildren: () => import('./pm-app/pm-app.module').then((m) => m.PmAppModule),
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
