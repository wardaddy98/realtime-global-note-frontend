import { INote } from '../commonTypes';
import { SortValueType } from '../redux/note/types';

export const filterNotes = (notes: INote[], searchValue: string, sortValue: SortValueType) => {
  const filterBySearchValue = (tempNotes: INote[]) =>
    tempNotes.filter(
      e =>
        e.createdBy?.name?.toLowerCase().includes(searchValue) ||
        e?.title?.toLowerCase().includes(searchValue),
    );
  const sortBySortValue = (tempNotes: INote[]) => {
    switch (sortValue) {
      case 'alphabeticalOrder':
        //ascending order
        return tempNotes.sort((a, b) => ((a.title ?? '') < (b.title ?? '') ? -1 : 1));

      case 'createdAt':
        //descending order i.e latest note first
        return tempNotes.sort((a, b) => ((a.createdAt ?? 0) > (b.createdAt ?? 0) ? -1 : 1));

      case 'lastUpdated':
        //descending order i.e latest note first
        return tempNotes.sort((a, b) => ((a.lastUpdated ?? 0) > (b.lastUpdated ?? 0) ? -1 : 1));
      default:
        return tempNotes;
    }
  };

  let result = [...notes];

  if (searchValue && !sortValue) {
    // only perform search
    result = filterBySearchValue(result);
  } else if (!searchValue && sortValue) {
    // only perform sort
    result = sortBySortValue(result);
  } else {
    // perform sort and search
    result = filterBySearchValue(sortBySortValue(result));
  }

  return result;
};

export const localStorageUtil = {
  getItem: (name: string) => JSON.parse(localStorage.getItem(name) as string),

  setItem: (name: string, value: unknown) => localStorage.setItem(name, JSON.stringify(value)),
  removeItem: (name: string) => localStorage.removeItem(name),

  clear: () => localStorage.clear(),
};
