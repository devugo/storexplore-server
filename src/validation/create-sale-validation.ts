import { body } from 'express-validator';

export const createSaleValidation = [
  body('soldAt').isString(),
  body('quantity').isString(),
  body('product').isString(),
];
