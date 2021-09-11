import { User } from '../entity/User';

export type CreateStoreOwnerDto = {
  name: string;
  photo?: string;
  about?: string;
  user?: User;
};
