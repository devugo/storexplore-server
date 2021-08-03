import { StoreController } from '../controller/StoreController';
import { authenticate } from '../middleware/authenticate';
import { createStoreValidation } from '../validation/create-store-validation';

export const StoreRoutes = [
  {
    method: 'post',
    route: '/stores',
    controller: StoreController,
    action: 'create',
    middleware: authenticate,
    validation: createStoreValidation,
  },
  {
    method: 'get',
    route: '/stores/:id',
    controller: StoreController,
    action: 'single',
    middleware: authenticate,
    validation: [],
  },
  {
    method: 'patch',
    route: '/stores/:id',
    controller: StoreController,
    action: 'update',
    middleware: authenticate,
    validation: createStoreValidation,
  },
  {
    method: 'post',
    route: '/stores/upload-logo/:id',
    controller: StoreController,
    action: 'uploadLogo',
    middleware: authenticate,
    validation: [],
  },
];
