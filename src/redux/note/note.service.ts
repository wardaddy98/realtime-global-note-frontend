import { ApiResponse } from '../../commonTypes';
import { rootApi } from '../rootApi';
import { GetNotesResponse } from './types';

export const noteApi = rootApi.injectEndpoints({
  endpoints: build => ({
    createNote: build.mutation({
      query: (payload: { title: string }) => ({
        url: '/note',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: ApiResponse) => response,
    }),

    getNotes: build.query({
      query: page => ({
        url: `/note?page=${page}&limit=10`,
        method: 'GET',
      }),
      transformResponse: (response: GetNotesResponse) => response,
    }),

    editNote: build.mutation({
      query: ({ content, noteId }: { content: string; noteId: string }) => ({
        url: `/note/${noteId}`,
        method: 'PATCH',
        body: { content },
      }),
      transformResponse: (response: ApiResponse) => response,
    }),

    deleteNote: build.mutation({
      query: noteId => ({
        url: `/note/${noteId}`,
        method: 'DELETE',
      }),
      transformResponse: (response: ApiResponse) => response,
    }),
  }),
});

export const {
  useCreateNoteMutation,
  useLazyGetNotesQuery,
  useEditNoteMutation,
  useDeleteNoteMutation,
} = noteApi;
