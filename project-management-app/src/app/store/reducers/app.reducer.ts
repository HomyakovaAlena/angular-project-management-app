import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
// import { DataThroughModal } from 'src/app/shared/store/reducers/shared.reducer';
import * as appActions from '../actions/app.actions';

export interface AppState {
  isLoading: boolean;
  // dataThroughModal: DataThroughModal;
}

export const initialState: AppState = {
  isLoading: false,
  // dataThroughModal: {},
};

export const appReducer = createReducer(
  initialState,
  on(appActions.setLoadingState, (state, { isLoading }) => ({
    ...state,
    isLoading,
  })),
  // on(appActions.passDataThroughModal, (state, { dataThroughModal }) => ({
  //   ...state,
  //   dataThroughModal,
  // })),
);

export const getAppState = createFeatureSelector<AppState>('app');
export const getIsLoading = createSelector(getAppState, (state) => state.isLoading);
// export const getDataThroughModal = createSelector(getAppState, (state) => state.dataThroughModal);
