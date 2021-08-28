import { Store } from '../entity/Store';
import { User } from '../entity/User';
import { GenderType } from '../enum/GenderType';

export type CreateSaleManagerDto = {
  firstname: string;
  lastname: string;
  othernames?: string;
  gender: GenderType;
  address?: string;
  dob: Date;
  photo?: string;
  user?: User;
  store?: Store;
  email: string;
  password: string;
};
