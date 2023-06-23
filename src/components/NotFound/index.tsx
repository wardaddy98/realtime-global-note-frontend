import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './notFound.module.scss';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/', { replace: true });
  };
  return (
    <div className={styles.wrapper}>
      <span>The page you requested was not found 😒...</span>

      <Button type='primary' onClick={handleGoBack}>
        Go back
      </Button>
    </div>
  );
};

export default NotFound;
