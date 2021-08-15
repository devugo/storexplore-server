import { SaleBatchController } from '../controller/SaleBatchController';
import { authenticate } from '../middleware/authenticate';
import { activateResourceValidation } from '../validation/activate-resource-validation';

export const SaleBatchRoutes = [
  {
    method: 'post',
    route: '/sale-batches',
    controller: SaleBatchController,
    action: 'create',
    middleware: authenticate,
    validation: [],
  },
  {
    method: 'get',
    route: '/sale-batches',
    controller: SaleBatchController,
    action: 'get',
    middleware: authenticate,
    validation: [],
  },
  {
    method: 'get',
    route: '/sale-batches/:id',
    controller: SaleBatchController,
    action: 'getOne',
    middleware: authenticate,
    validation: [],
  },
  {
    method: 'patch',
    route: '/sale-batches/activate/:id',
    controller: SaleBatchController,
    action: 'activate',
    middleware: authenticate,
    validation: activateResourceValidation,
  },
];
