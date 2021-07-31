import { UserController } from '../controller/UserController';
import { createUserValidation } from '../validation/create-user-validation';

export const AuthRoutes = [
  {
    method: 'post',
    route: '/auth/register',
    controller: UserController,
    action: 'register',
    middleware: null,
    validation: createUserValidation,
  },
  {
    method: 'post',
    route: '/auth/login',
    controller: UserController,
    action: 'login',
    middleware: null,
    validation: createUserValidation,
  },
];
