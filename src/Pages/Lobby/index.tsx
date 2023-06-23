import { nanoid } from '@reduxjs/toolkit';
import { Button } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyValuePlaceholder from '../../components/EmptyValuePlaceholder';
import FilterAndSort from '../../components/FilterAndSort';
import Loader from '../../components/Loader';
import NoteCard from '../../components/NoteCard';
import NoteCreator from '../../components/NoteCreator';
import NoteModal from '../../components/NoteModal';
import UsersDrawer from '../../components/UsersDrawer';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useLazyGetNotesQuery } from '../../redux/note/note.service';
import {
  selectCurrentPage,
  selectNotes,
  selectSearchValue,
  selectShowActiveUsersDrawer,
  selectShowNoteModal,
  selectSortValue,
  selectTotalPages,
  setShowNoteModal,
  setShowUsersDrawer,
} from '../../redux/note/note.slice';
import { filterNotes } from '../../utils/common.utils';
import styles from './lobby.module.scss';

const Lobby = () => {
  const [getNotes, { isFetching, isLoading }] = useLazyGetNotesQuery();

  const dispatch = useDispatch();
  const showNoteModal = useSelector(selectShowNoteModal);
  const showUsersDrawer = useSelector(selectShowActiveUsersDrawer);
  const notes = useSelector(selectNotes);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const sortValue = useSelector(selectSortValue);
  const searchValue = useSelector(selectSearchValue);

  const [showNoteCreator, setShowNoteCreator] = useState<boolean>(false);

  const { matches: isMobile } = useMediaQuery('(max-width: 800px');

  useEffect(() => {
    //get page 1 notes
    getNotes(1);
  }, []);

  const filteredNotes = useMemo(() => {
    if (!notes.length) return [];
    return filterNotes(notes, searchValue.toLowerCase(), sortValue);
  }, [sortValue, searchValue, notes]);

  const closeNoteModal = () => {
    dispatch(setShowNoteModal(false));
  };

  const handleAddNote = () => {
    setShowNoteCreator(true);
  };

  const handleShowUsers = () => {
    dispatch(setShowUsersDrawer(true));
  };

  const handleLoadMore = () => {
    getNotes(currentPage + 1);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div
          className={styles.top_section}
          style={isMobile ? { justifyContent: 'space-between' } : { justifyContent: 'flex-start' }}
        >
          <div className={styles.first}>
            {!showNoteCreator && (
              <Button type='primary' onClick={handleAddNote}>
                Add Note
              </Button>
            )}
          </div>
          <div className={styles.second}>
            {isMobile && (
              <Button type='default' onClick={handleShowUsers}>
                Show Users
              </Button>
            )}
          </div>
        </div>

        {showNoteCreator && <NoteCreator handleClose={() => setShowNoteCreator(false)} />}

        <FilterAndSort />

        {isLoading ? (
          <Loader style={{ marginTop: '10rem' }} loadingText='Getting notes...' />
        ) : filteredNotes?.length > 0 ? (
          <div className={styles.notes_wrapper}>
            {filteredNotes?.map(e => (
              <NoteCard note={e} key={nanoid()} />
            ))}
          </div>
        ) : (
          <EmptyValuePlaceholder style={{ margin: '12rem 0' }} text='No notes found...' />
        )}

        {currentPage < totalPages && (
          <div className={styles.load_more_wrapper}>
            <Button type='primary' onClick={handleLoadMore} loading={isFetching}>
              Load More
            </Button>
          </div>
        )}
      </div>
      {showNoteModal && <NoteModal isOpen={showNoteModal} onClose={closeNoteModal} />}
      {showUsersDrawer && (
        <UsersDrawer isOpen={showUsersDrawer} onClose={() => dispatch(setShowUsersDrawer(false))} />
      )}
    </>
  );
};

export default Lobby;
