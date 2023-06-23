import { Dispatch, Store } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import { INote, IUser } from '../commonTypes';
import { setUsers } from '../redux/auth/auth.slice';
import { setNotes } from '../redux/note/note.slice';
import { RootState } from '../redux/types';

export const globalSocketListeners = (socket: Socket, dispatch: Dispatch, store: Store) => {
  socket.on('user-online', (userId: string) => {
    const { auth } = store.getState() as RootState;
    let tempUsers: IUser[] = auth?.users ?? [];
    tempUsers = tempUsers?.map((e: IUser) => {
      return e?._id === userId ? { ...e, isOnline: true } : e;
    });
    dispatch(setUsers(tempUsers));
  });

  socket.on('user-offline', userId => {
    const { authState } = store.getState() as RootState;
    let tempUsers: IUser[] = authState?.users ?? [];
    tempUsers = tempUsers?.map((e: IUser) => {
      return e?._id === userId ? { ...e, isOnline: false } : e;
    });
    dispatch(setUsers(tempUsers));
  });

  socket.on('note-add', (note: INote) => {
    const { note: noteState } = store.getState() as RootState;
    const notes: INote[] = [...noteState.notes] ?? [];
    notes.unshift(note);
    dispatch(setNotes(notes));
  });

  socket.on('note-delete', (noteId: string) => {
    const { note: noteState } = store.getState() as RootState;
    let notes: INote[] = [...noteState.notes];
    notes = notes.filter(e => e._id !== noteId);
    dispatch(setNotes(notes));
  });

  socket.on('note-update', (note: INote) => {
    const { note: noteState } = store.getState() as RootState;
    let notes: INote[] = [...noteState.notes];
    notes = notes.map(e => (e._id === note._id ? note : e));
    dispatch(setNotes(notes));
  });

  socket.on('note-in-use', (noteId: string) => {
    const { note: noteState } = store.getState() as RootState;
    let notes: INote[] = [...noteState.notes];
    notes = notes.map((e: INote) => (e._id === noteId ? { ...e, isInUse: true } : e));
    dispatch(setNotes(notes));
  });

  socket.on('note-not-in-use', (noteId: string) => {
    const { note: noteState } = store.getState() as RootState;
    let notes: INote[] = [...noteState.notes];
    notes = notes.map((e: INote) => (e._id === noteId ? { ...e, isInUse: false } : e));
    dispatch(setNotes(notes));
  });
};
