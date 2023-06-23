import { Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSearchValue,
  selectSortValue,
  setSearchValue,
  setSortValue,
} from '../../redux/note/note.slice';
import styles from './filterAndSort.module.scss';

const FilterAndSort = () => {
  const searchValue = useSelector(selectSearchValue);
  const sortValue = useSelector(selectSortValue);
  const dispatch = useDispatch();

  const handleSortChange = (value: 'createdAt' | 'lastUpdated' | 'alphabeticalOrder' | 'clear') => {
    dispatch(setSortValue(value === 'clear' ? '' : value));
  };

  const handleSearchChange = (e: any) => {
    dispatch(setSearchValue(e?.target?.value));
  };

  const sortOptions = [
    {
      label: 'Created At',
      value: 'createdAt',
    },
    {
      label: 'Last updated',
      value: 'lastUpdated',
    },
    {
      label: 'Alphabetical order',
      value: 'alphabeticalOrder',
    },
    {
      label: 'Clear',
      value: 'clear',
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Select
        className={styles.select}
        value={sortValue === '' ? null : sortValue}
        options={sortOptions}
        onChange={handleSortChange}
        placeholder='Sort By'
        style={sortValue ? { border: '2px solid #ffd803', borderRadius: '8px' } : {}}
      />

      <Input
        value={searchValue}
        className={styles.input}
        placeholder='Search Notes...'
        allowClear
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default FilterAndSort;
