import { UserController } from '../controller/UserController';
import { authenticate } from '../middleware/authenticate';
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
    validation: [],
  },
  {
    method: 'get',
    route: '/auth/retain',
    controller: UserController,
    action: 'retain',
    middleware: authenticate,
    validation: [],
  },
  {
    method: 'patch',
    route: '/auth/change-password',
    controller: UserController,
    action: 'changePassword',
    middleware: authenticate,
    validation: [],
  },
];
