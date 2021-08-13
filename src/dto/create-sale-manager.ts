import { Store } from '../entity/Store';
import { User } from '../entity/User';

export type CreateSaleManagerDto = {
  firstname: string;
  lastname: string;
  othernames: string;
  dob: Date;
  photo?: string;
  user?: User;
  store?: Store;
  email: string;
  password: string;
};
