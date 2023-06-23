import { Button, Collapse, CollapseProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '../../hooks/useToast';
import { selectCurrentUser } from '../../redux/auth/auth.slice';
import { useDeleteNoteMutation, useEditNoteMutation } from '../../redux/note/note.service';
import { setSelectedNote, setShowNoteModal } from '../../redux/note/note.slice';
import { socketInstance } from '../../socket/socketInit';
import UserCard from '../UserCard';
import styles from './noteCard.module.scss';
import { INoteCard } from './types';

const NoteCard = (props: INoteCard) => {
  const { note } = props;

  const currentUser = useSelector(selectCurrentUser);

  const [editNoteApi, { isLoading: editNoteLoading }] = useEditNoteMutation({});
  const [deleteNoteApi, { isLoading: deleteNoteLoading }] = useDeleteNoteMutation({});
  const [content, setContent] = useState(note?.content ?? '');
  const [contentError, setContentError] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { errorToast, successToast } = useToast();

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
  };

  const handleShowEdits = () => {
    dispatch(setSelectedNote(note ?? {}));
    dispatch(setShowNoteModal(true));
  };

  useEffect(() => {
    if (note._id === 'emn0BAItNOnLW2HCbIKsA') {
      console.log(note?.isInUse, 'use');
    }
  }, [note?.isInUse]);

  const handleNoteDelete = async () => {
    try {
      const result = await deleteNoteApi(note?._id ?? '').unwrap();

      if (result?.status === 200) {
        successToast(result?.message);
      }
    } catch (err: any) {
      errorToast(err?.data?.message ?? undefined);
    }
  };

  const collapseItems: CollapseProps['items'] = [
    {
      key: '1',
      label: <span className={styles.heading}>Contributed By :</span>,
      children: note?.contributedBy?.length ? (
        <div className={styles.contributed_by_wrapper}>
          {note?.contributedBy?.map((e, index) => (
            <UserCard user={e} key={index} showOnlineStatus={false} />
          ))}
        </div>
      ) : (
        <span>No Contributions yet.</span>
      ),
    },
  ];

  const handleSubmit = async () => {
    try {
      if (!content?.length) {
        setContentError(true);
        return;
      } else {
        setContentError(false);
        const result = await editNoteApi({ content, noteId: note._id ?? '' }).unwrap();
        if (result?.status === 200) {
          successToast(result?.message);
        }
      }
    } catch (err: any) {
      errorToast(err?.data?.message ?? undefined);
    }
  };

  const handleOnFocus = (e: any) => {
    if (note?.isInUse) {
      e?.preventDefault();
    } else {
      socketInstance.emit('note-in-use', note._id);
    }
  };

  const handleOnBlur = (e: any) => {
    if (note?.isInUse) {
      e?.preventDefault();
    } else {
      socketInstance.emit('note-not-in-use', note._id);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.single_line_section}>
        <div className={styles.section}>
          <span className={styles.heading}>Title :</span>
          <span>{note.title}</span>
        </div>

        {currentUser?._id === note.createdBy?._id && (
          <Button
            loading={deleteNoteLoading}
            icon={<i style={{ color: 'red' }} className='ri-delete-bin-line'></i>}
            onClick={handleNoteDelete}
          >
            Delete
          </Button>
        )}
      </div>

      <div className={styles.single_line_section}>
        <div className={styles.section}>
          <span className={styles.heading}>Created by :</span>
          <span>{note.createdBy?.name ?? ''}</span>
        </div>

        <div className={styles.section}>
          <span className={styles.heading}>Created At :</span>
          <span>{DateTime.fromMillis(note?.createdAt ?? 0).toFormat('dd LLL yyyy')}</span>
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.heading}>Last updated At :</span>
        <span>
          {DateTime.fromMillis(note?.lastUpdated ?? 0).toLocaleString(DateTime.DATETIME_MED)}
        </span>
      </div>

      <div className={styles.section}>
        <label className={styles.heading} htmlFor='content'>
          Content :
        </label>
        <TextArea
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          placeholder={note?.isInUse ? 'Someone is typing....' : 'Enter content here...'}
          value={note?.isInUse ? 'Someone is typing....' : content}
          id='content'
          name='content'
          onChange={handleContentChange}
          style={{ resize: 'none' }}
          rows={5}
          disabled={note?.isInUse}
        />
        {contentError && <span className='error'>Content is empty</span>}
      </div>

      <div className={styles.button_section}>
        <Button
          type='primary'
          loading={editNoteLoading}
          onClick={handleSubmit}
          disabled={note?.isInUse}
        >
          Save
        </Button>
        <Button type='default' onClick={handleShowEdits}>
          Show Last Edits
        </Button>
      </div>

      <Collapse items={collapseItems} />
    </div>
  );
};

export default NoteCard;
