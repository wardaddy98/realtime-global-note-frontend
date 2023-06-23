import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { uniqBy } from 'lodash';
import { RootState } from '../types';
import { INote } from './../../commonTypes';
import { noteApi } from './note.service';
import { GetNotesResponse, IInitialNoteState, SortValueType } from './types';

export const NOTE_SLICE_KEY = 'note';

const initialNoteState: IInitialNoteState = {
  notes: [],
  selectedNote: {},
  showNoteModal: false,
  showUsersDrawer: false,
  searchValue: '',
  sortValue: '',
  currentPage: 1,
  totalPages: 0,
};

const noteSlice = createSlice({
  name: NOTE_SLICE_KEY,
  initialState: initialNoteState,
  reducers: {
    setShowNoteModal: (state, { payload }: PayloadAction<boolean>) => {
      state.showNoteModal = payload;
    },

    setSelectedNote: (state, { payload }: PayloadAction<INote>) => {
      state.selectedNote = payload;
    },
    setShowUsersDrawer: (state, { payload }: PayloadAction<boolean>) => {
      state.showUsersDrawer = payload;
    },

    setSortValue: (state, { payload }: PayloadAction<SortValueType>) => {
      state.sortValue = payload;
    },

    setSearchValue: (state, { payload }: PayloadAction<string>) => {
      state.searchValue = payload;
    },

    setNotes: (state, { payload }: PayloadAction<INote[]>) => {
      state.notes = payload;
    },
  },

  extraReducers: builder => {
    builder.addMatcher(
      noteApi.endpoints.getNotes.matchFulfilled,
      (state, { payload }: PayloadAction<GetNotesResponse>) => {
        if (payload?.body?.notes?.length) {
          const tempNotes = uniqBy([...state.notes, ...payload.body.notes], '_id');
          state.notes = tempNotes;
        }
        state.totalPages = payload.body.totalPages;
        state.currentPage = payload.body.currentPage;
      },
    );
  },
});

export const noteSliceReducer = noteSlice.reducer;

export const {
  setShowNoteModal,
  setSelectedNote,
  setShowUsersDrawer,
  setSearchValue,
  setSortValue,
  setNotes,
} = noteSlice.actions;

export const getNoteSliceState = (rootState: RootState): IInitialNoteState =>
  rootState[NOTE_SLICE_KEY];
export const selectNotes = (rootState: RootState) => getNoteSliceState(rootState).notes;
export const selectSelectedNote = (rootState: RootState) =>
  getNoteSliceState(rootState).selectedNote;
export const selectShowNoteModal = (rootState: RootState) =>
  getNoteSliceState(rootState).showNoteModal;
export const selectShowActiveUsersDrawer = (rootState: RootState) =>
  getNoteSliceState(rootState).showUsersDrawer;
export const selectSearchValue = (rootState: RootState) => getNoteSliceState(rootState).searchValue;
export const selectSortValue = (rootState: RootState) => getNoteSliceState(rootState).sortValue;
export const selectCurrentPage = (rootState: RootState) => getNoteSliceState(rootState).currentPage;
export const selectTotalPages = (rootState: RootState) => getNoteSliceState(rootState).totalPages;
