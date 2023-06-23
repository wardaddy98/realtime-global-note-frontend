import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '../constants';
import { localStorageUtil } from '../utils/common.utils';
import { RootState } from './types';

const getBaseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL,
  prepareHeaders: (headers, { getState }) => {
    const currentUserId = (getState() as RootState)?.auth?.currentUser?._id;

    //typically we would be setting jwt token in authorization header here, but since this app
    //has no login register functionality, I'm adding userId in the headers to check id the user is valid (on the server side)

    if (currentUserId) {
      headers.set('userid', currentUserId);
      headers.set('accept', 'application/json');
    }
    return headers;
  },
});

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await getBaseQuery(args, api, extraOptions);

  if (result.error?.status === 403) {
    api.dispatch({ type: 'RESET_STORE' });
    localStorageUtil.removeItem('currentUserId')
  }

  return result;
};

export const rootApi = createApi({
  reducerPath: 'api',
  baseQuery: dynamicBaseQuery,
  keepUnusedDataFor: 0,
  endpoints: () => ({}),
});
