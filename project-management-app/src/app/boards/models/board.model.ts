import { User } from '../../auth/models/user.model';

export interface Board {
  _id?: string;
  title: string;
  owner: string;
  users: string[];
}
