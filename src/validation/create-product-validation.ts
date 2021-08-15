import { body } from 'express-validator';

export const createProductValidation = [
  body('name').isString().isLength({ min: 2 }),
  body('description').isString(),
  body('quantity').isString(),
  body('image').isString().optional(),
  body('store').isString().optional(),
];
