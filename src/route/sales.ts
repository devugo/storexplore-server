import { SaleController } from '../controller/SaleController';
import { authenticate } from '../middleware/authenticate';
import { activateResourceValidation } from '../validation/activate-resource-validation';
import { createSaleValidation } from '../validation/create-sale-validation';

export const SaleRoutes = [
  {
    method: 'post',
    route: '/sales',
    controller: SaleController,
    action: 'create',
    middleware: authenticate,
    validation: createSaleValidation,
  },
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
    method: 'delete',
    route: '/sales/:id',
    controller: SaleController,
    action: 'delete',
    middleware: authenticate,
    validation: [],
  },
  {
    method: 'patch',
    route: '/sales/:id',
    controller: SaleController,
    action: 'update',
    middleware: authenticate,
    validation: createSaleValidation,
  },
  {
    method: 'patch',
    route: '/sales/activate/:id',
    controller: SaleController,
    action: 'activate',
    middleware: authenticate,
    validation: activateResourceValidation,
  },
];
