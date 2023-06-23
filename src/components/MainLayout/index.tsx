import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useGetAllUsersQuery } from '../../redux/auth/auth.service';
import {
  selectAllUsers,
  selectCurrentUser,
  selectIsAuthenticated,
} from '../../redux/auth/auth.slice';
import { socketInstance } from '../../socket/socketInit';
import { localStorageUtil } from '../../utils/common.utils';
import Loader from '../Loader';
import UserCard from '../UserCard';
import styles from './mainLayout.module.scss';
import { IMainLayout } from './types';

const MainLayout = (props: IMainLayout) => {
  const users = useSelector(selectAllUsers);
  const { isLoading } = useGetAllUsersQuery({}, { skip: !!users?.length });
  const { matches: isMobile } = useMediaQuery('(max-width: 800px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);

  const logout = () => {
    localStorageUtil.removeItem('currentUserId');
    dispatch({ type: 'RESET_STORE' });
    socketInstance.emit('unsubscribe', currentUser?._id ?? '');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.top_bar}>
        <div></div>
        <span className={styles.heading} onClick={() => navigate('/')}>
          Realtime Global Note App
        </span>

        <div>
          {isAuthenticated && (
            <Button style={{ justifySelf: 'flex-end' }} onClick={logout}>
              Logout
            </Button>
          )}
        </div>
      </div>

      {isMobile || !window.location.pathname.includes('lobby') ? (
        <>
          <div className={styles.body}>{props.children}</div>
          <Footer />
        </>
      ) : (
        <>
          <div className={styles.content_wrapper}>
            <div className={styles.split_body}>{props.children}</div>
            <Footer />
          </div>

          <div className={styles.side_bar}>
            {isLoading ? (
              <Loader style={{ marginTop: '10rem' }} loadingText='Getting users...' />
            ) : (
              <>
                <span>Users</span>
                <div className={styles.users_wrapper}>
                  {users?.map((e, index) => (
                    <UserCard key={index} user={e} />
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const Footer = () => {
  return (
    <div className={styles.footer}>
      <span>Copyright &copy; Realtime Global Note App</span>
    </div>
  );
};

export default MainLayout;
