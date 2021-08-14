import { SaleManagerController } from '../controller/SaleManagerController';
import { authenticate } from '../middleware/authenticate';
import { activateSaleManagerValidation } from '../validation/activate-sale-manager-validation';
import { createSaleManagerValidation } from '../validation/create-sale-manager-validation';

export const SaleManagerRoutes = [
  {
    method: 'post',
    route: '/sale-managers',
    controller: SaleManagerController,
    action: 'create',
    middleware: authenticate,
    validation: createSaleManagerValidation,
  },
  {
    method: 'get',
    route: '/sale-managers',
    controller: SaleManagerController,
    action: 'get',
    middleware: authenticate,
    validation: [],
  },
  {
    method: 'get',
    route: '/sale-managers/:id',
    controller: SaleManagerController,
    action: 'getOne',
    middleware: authenticate,
    validation: [],
  },
  {
    method: 'delete',
    route: '/sale-managers/:id',
    controller: SaleManagerController,
    action: 'delete',
    middleware: authenticate,
    validation: [],
  },
  {
    method: 'patch',
    route: '/sale-managers',
    controller: SaleManagerController,
    action: 'update',
    middleware: authenticate,
    validation: [],
  },
  {
    method: 'patch',
    route: '/sale-managers/:id',
    controller: SaleManagerController,
    action: 'activate',
    middleware: authenticate,
    validation: activateSaleManagerValidation,
  },
  {
    method: 'post',
    route: '/sale-managers/avatar',
    controller: SaleManagerController,
    action: 'uploadAvatar',
    middleware: authenticate,
    validation: [],
  },
];
