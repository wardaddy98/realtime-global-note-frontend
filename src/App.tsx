import { ConfigProvider } from 'antd';
import { isEmpty } from 'lodash';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import { useLazyGetCurrentUserQuery } from './redux/auth/auth.service';
import { selectCurrentUser, setCurrentUser } from './redux/auth/auth.slice';
import AppRoutes from './routes/AppRoutes';
import { localStorageUtil } from './utils/common.utils';

function App() {
  const localCurrentUserId = localStorageUtil.getItem('currentUserId');
  const currentUser = useSelector(selectCurrentUser);
  const [fetchCurrentUser] = useLazyGetCurrentUserQuery();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    //if userId is present in local storage but current user is not in redux store, fetch current user(this will happen on the case of page reload)
    if (localCurrentUserId && isEmpty(currentUser)) {
      fetchCurrentUser(localCurrentUserId);
    }

    //is userId is present in local storage , current user is present in redux store but, user is marked offline then remove local current user and current user
    //this will happen in the case when user closes the browser without logging out
    if (localCurrentUserId && !isEmpty(currentUser) && !currentUser?.isOnline) {
      localStorageUtil.removeItem('currentUserId');
      dispatch(setCurrentUser({}));
    }
  }, [localCurrentUserId, currentUser]);

  const antDesignTheme = {
    token: {
      colorPrimary: '#ffd803',
    },
  };
  return (
    <ConfigProvider theme={antDesignTheme}>
      <Router>
        <AppRoutes />
      </Router>
    </ConfigProvider>
  );
}

export default App;
