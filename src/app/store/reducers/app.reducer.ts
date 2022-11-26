import { ActionReducer, createFeatureSelector, createReducer, createSelector, on, State } from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import * as appActions from '../actions/app.actions';

export interface AppState {
  isLoading: boolean;
}

export const initialState: AppState = {
  isLoading: false,
};

export const appReducer = createReducer(
  initialState,
  on(appActions.setLoadingState, (state, { isLoading }) => ({
    ...state,
    isLoading,
  })),
);


export function reset(reducer: ActionReducer<any>) {
  return function (state: any, action: any) {

    if (action.type === appActions.reset.type) {
      return reducer(undefined, action);
    }

    return reducer(state, action);
  };
}

export const getAppState = createFeatureSelector<AppState>('app');
export const getIsLoading = createSelector(getAppState, (state) => state.isLoading);
