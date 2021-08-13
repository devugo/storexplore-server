import { RoleType } from '../enum/RoleType';

export type CreateUserDto = {
  email: string;
  password: string;
  role?: RoleType;
};
