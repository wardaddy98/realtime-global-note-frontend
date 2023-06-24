import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { useLazyGetAllUsersQuery } from '../../redux/auth/auth.service';
import { selectAllUsers, setCurrentUser, setUsers } from '../../redux/auth/auth.slice';
import { socketInstance } from '../../socket/socketInit';
import { localStorageUtil } from '../../utils/common.utils';
import styles from './landing.module.scss';
import { IUserCard } from './types';

const Landing = () => {
  const [getAllUsers, { isLoading, isFetching }] = useLazyGetAllUsersQuery({});
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    if (!users?.length) {
      getAllUsers({});
    }
  }, [users]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {isLoading || isFetching ? (
          <Loader style={{ marginTop: '10rem' }} loadingText='Getting users...' />
        ) : (
          <>
            <div className={styles.top_section}>
              <span>Select a user to continue: </span>
            </div>

            <div className={styles.users_wrapper}>
              {users?.map((e, index) => (
                <UserCard key={index} user={e} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const UserCard = (props: IUserCard) => {
  const { user } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  const handleUserClick = () => {
    if (user?.isOnline) return;
    localStorageUtil.setItem('currentUserId', user._id);
    dispatch(setCurrentUser({ ...user, isOnline: true }));
    const updatedUsers = [...users].map(e => (e?._id === user?._id ? { ...e, isOnline: true } : e));
    dispatch(setUsers(updatedUsers));
    navigate('/lobby', { replace: true });
    socketInstance.emit('subscribe', user?._id ?? '');
  };

  return (
    <div
      className={styles.user_card}
      onClick={handleUserClick}
      style={
        user?.isOnline ? { cursor: 'not-allowed', background: '#d3d3d3' } : { cursor: 'pointer' }
      }
    >
      <span>{user?.name}</span>
    </div>
  );
};
export default Landing;
