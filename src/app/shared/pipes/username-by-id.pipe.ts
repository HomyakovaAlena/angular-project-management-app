import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { UserService } from '../../users/services/user.service';

@Pipe({
  name: 'usernameById',
})
export class UsernameByIdPipe implements PipeTransform {
  constructor(private userService: UserService) {}
  result = '';

  transform(id: string): Observable<string> {
    const user$ = this.userService.getUserById(id).pipe(
      map((user) => user.name),
      take(1),
    );
    return user$;
  }
}
