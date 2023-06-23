import { ApiResponse, IUser } from '../../commonTypes';

export interface IInitialAuthState {
  users: IUser[];
  currentUser: IUser;
}

export interface GetAllUsersResponse extends ApiResponse {
  body: {
    users: Array<IUser>;
  };
}
export interface GetCurrentUserResponse extends ApiResponse {
  body: {
    user: IUser;
  };
}
