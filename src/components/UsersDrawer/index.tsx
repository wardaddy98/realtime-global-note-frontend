import { Drawer } from 'antd';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../../redux/auth/auth.slice';
import UserCard from '../UserCard';
import { IUsersDrawer } from './types';
import styles from './usersDrawer.module.scss';

const UsersDrawer = (props: IUsersDrawer) => {
  const { isOpen, onClose } = props;

  const users = useSelector(selectAllUsers);

  return (
    <Drawer
      className={styles.drawer}
      open={isOpen}
      onClose={onClose}
      placement='right'
      title='Users'
    >
      <div className={styles.users_wrapper}>
        {users?.map((e, index) => (
          <UserCard user={e} key={index} />
        ))}
      </div>
    </Drawer>
  );
};

export default UsersDrawer;
