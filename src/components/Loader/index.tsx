import { Spin } from 'antd';
import styles from './loader.module.scss';
import { ILoader } from './types';

const Loader = (props: ILoader) => {
  const { style, loadingText, showLoadingText = true } = props;
  return (
    <div style={style} className={styles.loader}>
      <Spin size='large' />
      {showLoadingText && (
        <span className={styles.loading_text}>{loadingText ?? 'Loading...'}</span>
      )}
    </div>
  );
};

export default Loader;
