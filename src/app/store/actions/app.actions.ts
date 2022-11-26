import { createAction, props } from '@ngrx/store';

export const setLoadingState = createAction('[App] Set loading', props<{ isLoading: boolean }>());
export const reset = createAction('[App] Reset');

