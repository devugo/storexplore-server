import { body } from 'express-validator';

export const createUserValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  body('name').isLength({ min: 3 }),
  body('storeName').isLength({ min: 3 }),
];
