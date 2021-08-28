import { RoleType } from '../enum/RoleType';

export type CreateUserDto = {
  email: string;
  password: string;
  name?: string;
  storeName?: string;
  role?: RoleType;
};
