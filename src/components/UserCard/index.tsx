import { Badge } from 'antd';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/auth/auth.slice';
import { IUserCard } from './types';
import styles from './userCard.module.scss';

const UserCard = (props: IUserCard) => {
  const { user, showOnlineStatus = true } = props;
  const currentUser = useSelector(selectCurrentUser);
  return (
    <div
      className={styles.user_card}
      style={
        currentUser?._id === user?._id
          ? { border: '3px solid #bae8e8' }
          : { border: '1px solid #272343' }
      }
    >
      <span>{user.name}</span>
      {showOnlineStatus && <Badge status={user?.isOnline ? 'success' : 'default'} />}
    </div>
  );
};

export default UserCard;
