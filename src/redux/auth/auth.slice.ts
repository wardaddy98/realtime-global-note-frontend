import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { IUser } from './../../commonTypes';
import { authApi } from './auth.service';
import { GetAllUsersResponse, GetCurrentUserResponse, IInitialAuthState } from './types';

export const AUTH_SLICE_KEY = 'auth';

const initialAuthState: IInitialAuthState = {
  users: [],
  currentUser: {},
};

const authSlice = createSlice({
  name: AUTH_SLICE_KEY,
  initialState: initialAuthState,
  reducers: {
    setUsers: (state, { payload }: PayloadAction<IUser[]>) => {
      state.users = payload;
    },

    setCurrentUser: (state, { payload }: PayloadAction<IUser>) => {
      state.currentUser = payload;
    },
  },

  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.getAllUsers.matchFulfilled,
      (state, { payload }: PayloadAction<GetAllUsersResponse>) => {
        state.users = payload.body.users ?? [];
      },
    );

    builder.addMatcher(
      authApi.endpoints.getCurrentUser.matchFulfilled,
      (state, { payload }: PayloadAction<GetCurrentUserResponse>) => {
        state.currentUser = payload.body.user;
      },
    );
  },
});

export const authSliceReducer = authSlice.reducer;

export const { setUsers, setCurrentUser } = authSlice.actions;

export const getAuthState = (rootState: RootState): IInitialAuthState => rootState[AUTH_SLICE_KEY];
export const selectAllUsers = (rootState: RootState) => getAuthState(rootState).users;
export const selectCurrentUser = (rootState: RootState) => getAuthState(rootState).currentUser;
export const selectIsAuthenticated = (rootState: RootState) =>
  !!getAuthState(rootState).currentUser?._id;
