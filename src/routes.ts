import { AuthRoutes } from './route/auth';
import { ChatRoutes } from './route/chats';
import { ProductRoutes } from './route/products';
import { SaleManagerRoutes } from './route/sale-manager';
import { SaleRoutes } from './route/sales';
import { StoreRoutes } from './route/store';
import { StoreOwnerRoutes } from './route/store-owner';

export const Routes = [
  ...AuthRoutes,
  ...StoreRoutes,
  ...SaleManagerRoutes,
  ...ProductRoutes,
  ...SaleRoutes,
  ...ChatRoutes,
  ...StoreOwnerRoutes,
];
