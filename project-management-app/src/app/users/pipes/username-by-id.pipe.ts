import { Pipe, PipeTransform } from '@angular/core';
import {
  combineLatest,
  first,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
  pipe,
  Subscription,
  switchMap,
  take,
  tap,
  zip,
} from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { UserService } from '../services/user.service';

@Pipe({
  name: 'usernameById',
})
export class UsernameByIdPipe implements PipeTransform {
  private data: string[] = [];
  // private single!: string;
  constructor(private userService: UserService) {}

  transform(idArg: string): string {
    let value = '';
    // if (Array.isArray(idArg)) {
    //   const users$: Observable<User>[] = idArg.map((id) =>
    //     this.userService.getUserById(id).pipe(take(1)),
    //   );
    //   forkJoin(users$)
    //     .pipe(take(1))
    //     .subscribe((users) =>
    //       users.forEach((user) => {
    //         this.data.push(user.name);
    //       }),
    //     );
    //   return this.data;
    // } else {
      const user$: Observable<User> = this.userService.getUserById(idArg);
      user$.subscribe((user) => {
        console.log(user.name, 'yohoho');
        value = user.name;
      });
      return value;
    // }
  }
}
