import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../redux/auth/auth.slice';

const ProtectedRoute = (props: any) => {
  const isAuthenticated = !!useSelector(selectIsAuthenticated);

  return isAuthenticated ? props.children : <Navigate to='/' replace={true} />;
};

export default ProtectedRoute;
