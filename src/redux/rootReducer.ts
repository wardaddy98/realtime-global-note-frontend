import { Action, Reducer, combineReducers } from '@reduxjs/toolkit';
import { AUTH_SLICE_KEY, authSliceReducer } from './auth/auth.slice';
import { NOTE_SLICE_KEY, noteSliceReducer } from './note/note.slice';
import { rootApi } from './rootApi';
import { RootState } from './types';

export const rootReducer: Reducer = (state: RootState, action: Action) => {
  if (action.type === 'RESET_STORE') {
    state = {};
  }

  return combinedReducer(state, action);
};

const combinedReducer = combineReducers({
  [rootApi.reducerPath]: rootApi.reducer,
  [AUTH_SLICE_KEY]: authSliceReducer,
  [NOTE_SLICE_KEY]: noteSliceReducer,
});
