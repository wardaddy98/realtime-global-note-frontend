import styles from './emptyValuePlaceholder.module.scss';
import { IEmptyValuePlaceholder } from './types';

const EmptyValuePlaceholder = (props: IEmptyValuePlaceholder) => {
  const { text, style } = props;
  return (
    <div className={styles.wrapper} style={style}>
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default EmptyValuePlaceholder;
