import { body } from 'express-validator';

export const createSaleManagerValidation = [
  body('firstname').isString().isLength({ min: 2 }),
  body('lastname').isString().isLength({ min: 2 }),
  body('password').isLength({ min: 5 }),
  body('email').isEmail(),
  body('dob').isString(),
];
