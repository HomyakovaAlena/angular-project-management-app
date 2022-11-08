import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersSearchComponent } from './components/users-search/users-search.component';

const routes: Routes = [
  { path: '', component: UsersSearchComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
