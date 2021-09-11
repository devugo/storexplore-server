import { body } from 'express-validator';

export const updateStoreOwnerValidation = [
  body('name').isString().isLength({ min: 2 }),
];
