import { Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import { INoteEdit } from '../../commonTypes';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { selectSelectedNote } from '../../redux/note/note.slice';
import EmptyValuePlaceholder from '../EmptyValuePlaceholder';
import styles from './noteModal.module.scss';
import { INoteModal } from './types';

const NoteModal = (props: INoteModal) => {
  const { isOpen, onClose } = props;
  const { matches: isMobile } = useMediaQuery('(max-width: 800px)');
  const selectedNote = useSelector(selectSelectedNote);
  return (
    <Modal
      title='Last edits :'
      open={isOpen}
      onCancel={onClose}
      width={isMobile ? '90vw' : 800}
      footer={null}
      className={styles.modal}
    >
      {selectedNote?.edits && selectedNote?.edits?.length > 0 ? (
        <div className={styles.content_wrapper}>
          {selectedNote.edits.map((e, index) => (
            <EditContent key={index} edit={e} />
          ))}
        </div>
      ) : (
        <EmptyValuePlaceholder text='No edits yet...' style={{ margin: '4rem 0' }} />
      )}
    </Modal>
  );
};

const EditContent = (props: { edit: INoteEdit }) => {
  const { edit } = props;
  return (
    <div className={styles.edit_content}>
      <div className={styles.section}>
        <span className={styles.heading}>Content :</span>
        <TextArea style={{ resize: 'none' }} rows={3} disabled value={edit?.content} />
      </div>

      <div className={styles.section}>
        <div className={styles.section_small}>
          <span className={styles.heading}>Edited by :</span>
          <span>{edit?.editedBy?.name}</span>
        </div>
        <div className={styles.section_small}>
          <span className={styles.heading}>Edited At :</span>
          <span>
            {DateTime.fromMillis(edit?.editedAt ?? 0).toLocaleString(DateTime.DATETIME_MED)}
          </span>
        </div>
      </div>
    </div>
  );
};
export default NoteModal;
