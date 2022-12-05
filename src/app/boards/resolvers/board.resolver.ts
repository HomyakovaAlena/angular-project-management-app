import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Board } from '../models/board.model';
import { BoardService } from '../services/board.service';

@Injectable({
  providedIn: 'root',
})
export class BoardResolver implements Resolve<Board | null> {
  constructor(private router: Router, private boardService: BoardService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Board | null> {
    return this.boardService.getBoardById(route.paramMap.get('id')!).pipe(
      map((board) => {
        if (board) {
          return board;
        } else {
          this.router.navigate(['/boards']);
          return null;
        }
      }),
    );
  }
}
