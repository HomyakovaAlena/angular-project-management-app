import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SharedActions from '../actions/shared.actions';
import { catchError, exhaustMap, finalize, map, of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as BoardsActions from '../../../boards/store/actions/boards.actions';
// import * as fromRoot from '../../../store/reducers/app.reducer';
// import { Store } from '@ngrx/store';
// import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';
// import { BoardService } from '../../../boards/services/board.service';

@Injectable()
export class SharedEffects {
  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private sharedService: SharedService,
    // private store: Store<fromRoot.AppState>,
    // private boardService: BoardService,
  ) {}

  openDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SharedActions.openDialog),
        tap((config) => {
          this.sharedService.openDialog(config);
        }),
      ),
    { dispatch: false },
  );

  confirmDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedActions.confirmDialog),
      switchMap((data) => {
        const id = data.data?.['id'] as string;
        return of(BoardsActions.deleteBoard({ id: id }));
      }),
    ),
  );

  closeDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SharedActions.closeDialog),
        tap(() => this.dialog.closeAll()),
        //     map((payload) => {
        //       this.dialogRef.closeAll();
        //       return snackBarActions.savedSuccessfully(payload);
        //     }),
      ),
    { dispatch: false },
  );
}
