import { ApiResponse, INote } from '../../commonTypes';

export type SortValueType = '' | 'alphabeticalOrder' | 'lastUpdated' | 'createdAt';

export interface IInitialNoteState {
  notes: INote[];
  selectedNote: INote;
  showNoteModal: boolean;
  showUsersDrawer: boolean;
  sortValue: SortValueType;
  searchValue: string;
  currentPage: number;
  totalPages: number;
}

export interface GetNotesResponse extends ApiResponse {
  body: {
    notes: INote[];
    totalPages: number;
    currentPage: number;
  };
}
