import { body } from 'express-validator';

export const createStoreValidation = [
  body('name').isLength({ min: 3 }),
  body('industry').isLength({ min: 4 }),
];
