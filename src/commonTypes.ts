export interface IUser {
  _id?: string;
  name?: string;
  isOnline?: boolean;
}

export interface ApiResponse {
  status: number;
  message: string;
  body?: unknown;
}

export interface INoteEdit {
  _id: string;
  content: string;
  editedBy: IUser;
  editedAt: number;
}

export interface INote {
  _id?: string;
  title?: string;
  content?: string;
  contributedBy?: Array<IUser>;
  edits?: INoteEdit[];
  createdBy?: IUser;
  createdAt?: number;
  lastUpdated?: number;
  isInUse?: boolean;
}
