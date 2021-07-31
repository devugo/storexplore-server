import { UserController } from './controller/UserController';
import { authenticate } from './middleware/authenticate';
import { AuthRoutes } from './route/auth';

export const Routes = [
  ...AuthRoutes,
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all',
    middleware: authenticate,
    validation: [],
  },
  {
    method: 'get',
    route: '/users/:id',
    controller: UserController,
    action: 'one',
    middleware: null,
    validation: [],
  },
  {
    method: 'post',
    route: '/users',
    controller: UserController,
    action: 'save',
    middleware: null,
    validation: [],
  },
  {
    method: 'delete',
    route: '/users/:id',
    controller: UserController,
    action: 'remove',
    middleware: null,
    validation: [],
  },
  {
    method: 'get',
    route: '/test',
    controller: UserController,
    action: 'test',
    middleware: authenticate,
    validation: [],
  },
];
