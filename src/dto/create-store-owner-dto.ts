import { User } from '../entity/User';

export type CreateStoreOwnerDto = {
  name: string;
  photo?: string;
  user?: User;
};
