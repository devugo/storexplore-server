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
];
