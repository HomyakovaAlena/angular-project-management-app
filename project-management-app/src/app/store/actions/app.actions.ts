import { createAction, props } from '@ngrx/store';
// import { DataThroughModal } from '../reducers/app.reducer';

export const setLoadingState = createAction('[App] Set loading', props<{ isLoading: boolean }>());

// export const passDataThroughModal = createAction(
//   '[App] Pass data through modal',
//   props<{ dataThroughModal: DataThroughModal }>(),
// );
