import { UserController } from './controller/UserController';
import { authenticate } from './middleware/authenticate';
import { AuthRoutes } from './route/auth';
import { ChatRoutes } from './route/chats';
import { ProductRoutes } from './route/products';
import { SaleBatchRoutes } from './route/sale-batches';
import { SaleManagerRoutes } from './route/sale-manager';
import { SaleRoutes } from './route/sales';
import { StoreRoutes } from './route/store';

export const Routes = [
  ...AuthRoutes,
  ...StoreRoutes,
  ...SaleManagerRoutes,
  ...ProductRoutes,
  ...SaleBatchRoutes,
  ...SaleRoutes,
  ...ChatRoutes,
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
