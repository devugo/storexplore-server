import { StoreOwnerController } from '../controller/StoreOwnerController';
import { authenticate } from '../middleware/authenticate';
import { updateStoreOwnerValidation } from '../validation/update-store-owner-vaidation';

export const StoreOwnerRoutes = [
  {
    method: 'patch',
    route: '/store-owner',
    controller: StoreOwnerController,
    action: 'update',
    middleware: authenticate,
    validation: updateStoreOwnerValidation,
  },
  {
    method: 'patch',
    route: '/store-owner/avatar',
    controller: StoreOwnerController,
    action: 'uploadAvatar',
    middleware: authenticate,
    validation: [],
  },
];
