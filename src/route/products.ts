import { ProductController } from '../controller/ProductController';
import { authenticate } from '../middleware/authenticate';
import { activateResourceValidation } from '../validation/activate-resource-validation';
import { createProductValidation } from '../validation/create-product-validation';

export const ProductRoutes = [
  {
    method: 'post',
    route: '/products',
    controller: ProductController,
    action: 'create',
    middleware: authenticate,
    validation: createProductValidation,
  },
  {
    method: 'get',
    route: '/products',
    controller: ProductController,
    action: 'get',
    middleware: authenticate,
    validation: [],
  },
  {
    method: 'get',
    route: '/products/:id',
    controller: ProductController,
    action: 'getOne',
    middleware: authenticate,
    validation: [],
  },
  {
    method: 'delete',
    route: '/products/:id',
    controller: ProductController,
    action: 'delete',
    middleware: authenticate,
    validation: [],
  },
  {
    method: 'patch',
    route: '/products/:id',
    controller: ProductController,
    action: 'update',
    middleware: authenticate,
    validation: createProductValidation,
  },
  {
    method: 'patch',
    route: '/products/activate/:id',
    controller: ProductController,
    action: 'activate',
    middleware: authenticate,
    validation: activateResourceValidation,
  },
  {
    method: 'patch',
    route: '/products/image/:id',
    controller: ProductController,
    action: 'uploadImage',
    middleware: authenticate,
    validation: [],
  },
];
