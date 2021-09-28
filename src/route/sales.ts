import { SaleController } from '../controller/SaleController';
import { authenticate } from '../middleware/authenticate';

export const SaleRoutes = [
  {
    method: 'get',
    route: '/sales',
    controller: SaleController,
    action: 'get',
    middleware: authenticate,
    validation: [],
  },
  {
    method: 'get',
    route: '/sales/mine',
    controller: SaleController,
    action: 'mySales',
    middleware: authenticate,
    validation: [],
  },
  {
    method: 'get',
    route: '/sales/:id',
    controller: SaleController,
    action: 'getOne',
    middleware: authenticate,
    validation: [],
  },
  {
    method: 'get',
    route: '/sales/mine/:id',
    controller: SaleController,
    action: 'mySale',
    middleware: authenticate,
    validation: [],
  },
  {
    method: 'get',
    route: '/sales-summary',
    controller: SaleController,
    action: 'dashboardSummary',
    middleware: authenticate,
    validation: [],
  },
];
